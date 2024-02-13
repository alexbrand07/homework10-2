// 
// JavaScript (script.js)
const gradation = {
    20: "satisfactory",
    55: "good",
    85: "very-good",
    100: "excellent"
};


const users = [

    {
        name: "Jack Smith",
        age: 23,
        img: "JackSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 20
            },
            {
                "title": "Java Enterprise",
                "mark": 100
            }
        ]
    },

    {
        name: "Amal Smith",
        age: 20,
        img: "AmalSmith",
        role: "student"
    },

    {
        name: "Noah Smith",
        age: 43,
        img: "NoahSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 50
            }
        ]
    },

    {
        name: "Charlie Smith",
        age: 18,
        img: "CharlieSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 75
            },
            {
                "title": "Java Enterprise",
                "mark": 23
            }]
    },

    {
        name: "Emily Smith",
        age: 30,
        img: "EmilySmith",
        role: "admin",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 10,
                "lector": "Leo Smith"
            },
            {
                "title": "Java Enterprise",
                "score": 50,
                "lector": "David Smith"
            },
            {
                "title": "QA",
                "score": 75,
                "lector": "Emilie Smith"
            }]
    },

    {
        name: "Leo Smith",
        age: 25,
        img: "LeoSmith",
        role: "lector",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 78,
                "studentsScore": 79
            },
            {
                "title": "Java Enterprise",
                "score": 85,
                "studentsScore": 85
            }
        ]
    }
];


// Общий класс User
class User {
    constructor(user) {
        this.name = user.name;
        this.age = user.age;
        this.img = `./images/users/${user.img}.png`;
        this.role = user.role;
        this.courses = user.courses || [];
    }

    render() {
        const block = document.createElement('div');
        block.classList.add('user-block');

        const img = document.createElement('img');
        img.src = this.img;
        img.alt = this.name;

        const name = document.createElement('p');
        name.textContent = `Name: ${this.name}`;

        const age = document.createElement('p');
        age.textContent = `Age: ${this.age}`;

        const role = document.createElement('p');
        role.textContent = `Role: ${this.role}`;

        const courses = document.createElement('ul');
        courses.classList.add('courses-list');

        this.renderCourses(courses);

        block.appendChild(img);
        block.appendChild(name);
        block.appendChild(age);
        block.appendChild(role);
        block.appendChild(courses);
        // this.renderCourses(courses);

        document.body.appendChild(block);

    }

    renderCourses(coursesList) {
        this.courses.forEach(course => {
            const courseItem = document.createElement('li');
            if (course.mark !== undefined) {
                courseItem.textContent = `${course.title}: ${course.mark}`;
            } else {
                courseItem.textContent = `${course.title}: ${course.score}`;
            }
            coursesList.appendChild(courseItem);
        });
    }
}

// Класс Student, наследующийся от User
class Student extends User {
    constructor(user) {
        super(user);
    }

    renderCourses(coursesList) {
        super.renderCourses(coursesList);
        if (this.role === 'student') {
            const gradationKeys = Object.keys(gradation).map(Number);
            const marks = this.courses.map(course => course.mark || 0);
            const maxMark = Math.max(...marks);
            const grade = gradation[gradationKeys.find(key => maxMark <= key)];
            const gradeItem = document.createElement('li');
            gradeItem.textContent = `Grade: ${grade}`;
            coursesList.appendChild(gradeItem);
        }
    }
}

// Класс Admin, наследующийся от User
class Admin extends User {
    constructor(user) {
        super(user);
    }

    renderCourses(coursesList) {
        super.renderCourses(coursesList);
        if (this.role === 'admin') {
            const lectors = this.courses.map(course => course.lector);
            const uniqueLectors = [...new Set(lectors)];
            const lectorsItem = document.createElement('li');
            lectorsItem.textContent = `Lectors: ${uniqueLectors.join(', ')}`;
            coursesList.appendChild(lectorsItem);
        }
    }
}

// Класс Lector, наследующийся от User
class Lector extends User {
    constructor(user) {
        super(user);
    }

    renderCourses(coursesList) {
        super.renderCourses(coursesList);
        if (this.role === 'lector') {
            const studentsMarks = this.courses.map(course => course.studentsScore);
            const averageMark = studentsMarks.reduce((sum, mark) => sum + mark, 0) / studentsMarks.length;
            const averageMarkItem = document.createElement('li');
            averageMarkItem.textContent = `Average Students Mark: ${averageMark}`;
            coursesList.appendChild(averageMarkItem);
        }
    }
}

// Создание экземпляров классов и рендеринг на странице
users.forEach(user => {
    let userInstance;
    switch (user.role) {
        case 'student':
            userInstance = new Student(user);
            break;
        case 'admin':
            userInstance = new Admin(user);
            break;
        case 'lector':
            userInstance = new Lector(user);
            break;
        default:
            userInstance = new User(user);
    }
    userInstance.render()
});
