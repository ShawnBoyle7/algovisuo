import { useSelector} from 'react-redux'
import LearningPathCourse from "../LearningPathCourse"

function LearningPath() {
  const sessionUser = useSelector(state => state.session?.user)
  const aspirationsArr = sessionUser?.aspirations.sort((a, b) => {
    return a.id - b.id
  });

  let courseIdArr = [];
    for(let i = 0; i < aspirationsArr.length; i++) {
      let aspiration = aspirationsArr[i];
        //check if the course id is already in arr
      if(!courseIdArr.includes(aspiration.courseId)){
        courseIdArr.push(aspiration.courseId)
      }
    }


  let aspByCourseArr = []
  courseIdArr.forEach(courseId => {
    let allAspInCourse = aspirationsArr.filter(asp => asp.courseId === courseId)
    aspByCourseArr.push(allAspInCourse)
  });



  //check aspiration.courseId
    //if haven't encountered, create a new array/div
    //else add to array/div already created

    const aspirationComponents = aspByCourseArr?.map((aspirations,idx) =>
          <LearningPathCourse key={idx} aspirations={aspirations} />
    );

  return (
    <div className='learning-path'>
      <h2 className='learning-path-header'>Your Learning Path</h2>
      <div>{aspirationComponents}</div>

    </div>
  );
}

export default LearningPath;
