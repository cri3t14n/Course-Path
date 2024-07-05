from django.core.management.base import BaseCommand
import pandas as pd
from course_info.models import CourseInfo
from django.db import transaction

class Command(BaseCommand):
    help = 'Import course info from csv file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='CSV file with course info')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        df = pd.read_csv(csv_file)
        courses = set()
        # Ensure all instances are created/updated first
        with transaction.atomic():
            for _, row in df.iterrows():
                if row['courseNumber'] not in courses:
                    new_instance = CourseInfo(
                        courseNumber=row['courseNumber'],
                        department=row['department'],
                        title = str(row.get('title', 'No Title')).strip() if pd.notna(row['title']) else 'No Title',
                        language=row['language'].strip(),  # Assuming language should also be stripped
                        courseType=row['courseType'].strip(),
                        schedule=row['schedule'].strip(),
                        course_url=row['course_url'].strip(),
                    )
                    new_instance.full_clean()  # Django's built-in method to validate all fields
                    new_instance.save()
                courses.add(row['courseNumber'])
            
        self.stdout.write(self.style.SUCCESS(f'Imported new courses successfully!'))


        #Second pass for M2M fields
        with transaction.atomic():
            for instance in CourseInfo.objects.filter(courseNumber__in=df['courseNumber'].tolist()):
                row = df.loc[df['courseNumber'] == instance.courseNumber].iloc[0]

                # Process notApplicableWith with existence check
                if pd.notna(row['notApplicableWith']):
                    not_applicable_with_numbers = row['notApplicableWith'].split(',')
                    # Filter and collect only existing courses
                    not_applicable_with = CourseInfo.objects.filter(courseNumber__in=not_applicable_with_numbers)
                    existing_numbers = not_applicable_with.values_list('courseNumber', flat=True)
                    not_applicable_with = [course for course in not_applicable_with if course.courseNumber in existing_numbers]
                    instance.notApplicableWith.set(not_applicable_with)

                # Process recommendedPrerequisites with existence check
                if pd.notna(row['recommendedPrerequisites']):
                    prerequisites_numbers = row['recommendedPrerequisites'].split(',')
                    # Filter and collect only existing courses
                    recommended_prerequisites = CourseInfo.objects.filter(courseNumber__in=prerequisites_numbers)
                    existing_numbers = recommended_prerequisites.values_list('courseNumber', flat=True)
                    recommended_prerequisites = [course for course in recommended_prerequisites if course.courseNumber in existing_numbers]
                    instance.recommendedPrerequisites.set(recommended_prerequisites)


        self.stdout.write(self.style.SUCCESS(f'Imported courses successfully!'))