from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time
import csv

desired_words = {'Autumn', 'Spring', 'August', 'January', 'June'}

# Specify the path to your Chrome driver executable
chrome_driver_path = '/Users/tobiasmikkelsen/Downloads/chromedriver_mac64/chromedriver'

# Initialize Chrome options
chrome_options = Options()
chrome_options.binary_location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


chrome_options.add_argument("--lang=en-US") 
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--headless')

import os
os.environ["PATH"] += os.pathsep + chrome_driver_path


driver = webdriver.Chrome(options=chrome_options)

link = 'https://kurser.dtu.dk/search?CourseCode=&SearchKeyword=&CourseType=DTU_BSC&TeachingLanguage=en-GB'
driver.get(link)

course_data = []

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, 'tr'))
)

driver.execute_script("setLanguage('en-GB');")
time.sleep(5)

courses = driver.find_elements(By.CSS_SELECTOR, 'tr')

for course in courses:
    details = course.find_elements(By.CSS_SELECTOR, 'td')
    if len(details) > 1:
        course_link_element = details[1].find_element(By.TAG_NAME, 'a')
        course_name = course_link_element.text[8:]
        course_url = course_link_element.get_attribute('href')
        course_code = course_url.split('/')[-1]

        driver.execute_script("window.open('{}');".format(course_url))
        driver.switch_to.window(driver.window_handles[1])
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'td')))
        

        recommended_prerequisites = []
        not_applicable_with = []
        department = []
        language = []
        course_type = []
        schedule = []

        rows = driver.find_elements(By.CSS_SELECTOR, 'tr')
        for row in rows:
            try:
                label = row.find_element(By.CSS_SELECTOR, 'label').text
                if "Not applicable together with" in label:
                    links = row.find_elements(By.CSS_SELECTOR, 'a.CourseLink')
                    not_applicable_with = [link.text.strip() for link in links]
                elif "Recommended Academic prerequisites" in label:
                    links = row.find_elements(By.CSS_SELECTOR, 'a.CourseLink')
                    recommended_prerequisites = [link.text.strip() for link in links]
                elif "Department" in label:
                    department = row.find_element(By.CSS_SELECTOR, 'td[title]')
                    department = department.get_attribute('title')[:2]
                elif "Language of instruction" in label:
                    language = row.find_elements(By.CSS_SELECTOR, 'td')[1]
                    language = language.text
                elif "Course type" in label:
                    course_type = row.find_elements(By.CSS_SELECTOR, 'div')[0]
                    course_type = course_type.text
                elif "Schedule" in label:
                    schedule_place = row.find_elements(By.CSS_SELECTOR, 'td')[1]
                    schedule_place = schedule_place.text
                    schedule_place = schedule_place.split('\n')
                    schedule_place = [line.strip() for line in schedule_place
                                  if any(line.strip().startswith(word) for word in desired_words)]
                    for part in schedule_place:
                        schedule.extend(part.split(' and '))
            except NoSuchElementException:
                continue  
        
        course_info = [department, language, course_type,  course_code, course_name, course_url, schedule, recommended_prerequisites, not_applicable_with]
        course_data.append(course_info)
    
        print(course_info)
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

driver.quit()

header = ['department', 'language', 'course_type', 'course_code', 'course_name', 'course_url','schedule', 'recommended_prerequisites', 'not_applicable_with']

csv_file = 'course_data.csv'
with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(header)
    for data in course_data:
        writer.writerow(data)


