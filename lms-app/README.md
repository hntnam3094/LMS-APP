## LMS APP - TECHNOLOGY
    - PHP 8.2
    - LARAVEL 11
    - LARAVEL BREEZE
    - LARAVEL INERTIA
    - REACT INERTIA 
    - TAILWIND CSS
    - QUILL REACT
    - GITHUB

## Diagrams - Database
https://drive.google.com/file/d/1E0POxJMokcLnfhasc3CnNSjomL0fEPod/view?usp=sharing

## LMS APP - USER PART

This is a course management app and in each course there will be many lessons

When a user registers for a course at the center, an account will be created, and this account will save the student's information including name, phone, email.

After registering an account, users will be added to the courses available at the center

When participating in courses, users will access the screen. To be able to see the courses, users will have to enter a phone number or email to join the courses. If not found, they will be notified. error

In courses and lessons, users will see the course content and can download course materials.

## LMS APP - OFFICE PART

Here instructors or admins can create courses and lessons, lessons will be added in table format and documents can be attached.

After adding, the admin or instructor can preview the courses and lessons by clicking on details

## RUN SOURCE

run: cp .env.exsample .env

run: docker compose up -d

connect database: 

    - host: localhost

    - port: 3311

    - user: root

    - host: lms1234

import: lms_20240623 in sql/lms_20240623

run: composer install

run: npm install

run: npm run dev

access host: localhost:8000
