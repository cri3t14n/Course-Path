import matplotlib.pyplot as plt
import networkx as nx
import csv
import ast

def parse_array_string(value):
    try:
        return ast.literal_eval(value)
    except (ValueError, SyntaxError):
        return value
    
csv_file = 'modified_course_data.csv'
G = nx.DiGraph()

rows = []

with open(csv_file, mode='r', newline='', encoding='utf-8') as file:
    reader = csv.reader(file)
    next(reader)
    for row in reader:
        parsed_row = [parse_array_string(cell) for cell in row]
        rows.append(parsed_row)
        
            
prereq_map = dict()
non_prereq_classes = set()

for row in rows:
    course_code = row[3]
    prereqs = row[7]
    naw_classes = row[8]
    if prereqs:
        prereq_map[course_code] = prereqs
    else:
        non_prereq_classes.add(course_code)
    



root_classes = non_prereq_classes - set(prereq_map.keys())

print(root_classes)

input_class = '01003'


    