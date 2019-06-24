const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId) { 
    const course = await Course.update({_id:courseId},{
      $unset:{
          'author':''
      }  
    });
    // //console.log(courses);
    // course.author.name='aseem agarwal';
    // course.save();
  }

  async function addAuthor(courseId,author) { 
    const course = await Course.findById(courseId);
      course.authors.push(author);
      course.save();
    }

    async function removeAuthor(courseId,authorId) { 
      const course = await Course.findById(courseId);
      const author =  course.authors.id(authorId);
      author.remove();
      course.save();
      }


removeAuthor('5c6bfd1fe819b446b0f94c28', '5c6bffec937a734751dee459');


//updateAuthor('5c6b05d3a761ef3bc186e8b8');
//createCourse('Node Course',[ new Author({ name: 'Mosh' }),new Author({ name: 'Mosh2' }),new Author({ name: 'Aseem' })]);
