from django.core.management.base import BaseCommand
import pandas as pd
from course_info.models import CourseInfo

class Command(BaseCommand):
    help = 'Import course info from csv file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='CSV file with course info')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        df = pd.read_csv(csv_file)

        models_instances = []

        for _, row in df.iterrows():
            # Convert department to integer, handling potential leading zeros
            try:
                department = int(row['department'])
            except ValueError:
                department = 0  # Provide a default value or handle as needed

            models_instances.append(
                CourseInfo(
                    courseNumber=row['courseNumber'],
                    department=department,
                    title=row['title'],
                    language=row['language'],
                    courseType=row['courseType'],
                    schedule=row['schedule'],
                    notApplicableWith=row['notApplicableWith'],
                    recomendedPrerequisites=row['recomendedPrerequisites'],
                    course_url=row['course_url'],
                )
            )
        CourseInfo.objects.bulk_create(models_instances)
        self.stdout.write(self.style.SUCCESS(f'Imported {len(models_instances)} successfully!'))