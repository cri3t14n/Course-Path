import csv
import numpy as np
import ast
input_csv = 'course_data.csv'
output_csv = 'modified_course_data.csv'

rows = []
courses = []

with open(input_csv, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.reader(infile)
    next(reader)
    for row in reader:
        rows.append(row)

rows = np.array(rows)

naw_classes = rows[:, 8]
prereq_classes = rows[:, 7]
classes = rows[:, 3]
        
refined_naw_classes = []
refined_pre_classes = []
    
for naw_class in naw_classes:
    section = []
    naw_class = ast.literal_eval(naw_class)
    for class_checked in naw_class:
        if class_checked in classes:
            section.append(class_checked)
    refined_naw_classes.append(str(section))

for pre_class in prereq_classes:
    section = []
    pre_class = ast.literal_eval(pre_class)
    for class_checked in pre_class:
        if class_checked in classes:
            section.append(class_checked)
    refined_pre_classes.append(str(section))

rows[:, 8] = refined_naw_classes
rows[:, 7] = refined_pre_classes

header = ['department', 'language', 'course_type', 'course_code', 'course_name', 'course_url','schedule', 'recommended_prerequisites', 'not_applicable_with']
with open(output_csv, mode='w', newline='', encoding='utf-8') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)
    for row in rows:
        writer.writerow(row)

