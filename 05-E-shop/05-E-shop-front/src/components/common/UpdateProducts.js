import { useRef} from 'react'
import classes from './UpdateProducts.module.css'
import { useNavigate } from 'react-router-dom';

function UpdateProducts(props) {
    // 有兩種方法可以實作，監聽用戶輸入input的值，第一是使用useState，透過onChange的方式，來監聽每一個字
    // 第二是使用useRef，可以直接參照DOM element，我們只需要當用戶輸入完後，去參考所輸入存入event object的值就好
    const titleInputRef = useRef()
    const imageInputRef = useRef()
    const addressInputRef = useRef()
    const descriptionInputRef = useRef()

    function submitHandler(e) {
        e.preventDefault(); // 防止瀏覽器reload

        // useRef()所構成的object其中的屬性property為current，所連結的為值value，就是input內的值
        // 雖然useRef()方便參照input的值，但不建議在程式碼更改然後顯示input的值
        // 例如： X titleInputRef.current.value = '我想給使用者看到的'
        // 要write到input上面建議使用useState
        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        
        const meetupData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription
        }

        // 將上層母元件的方法給呼叫
        props.onAddMeetup(meetupData)

    }

    let navigate = useNavigate();

  // 要傳遞NewMeetupForm的表單內所整理的json data
  function addMeetupHandler(meetupData) {
    // fetch()是內建於javascript，跟react無關
    // 後面的字段加入後，firebase就會幫你建立collection以及table，後面的.json是firebase需要的
    // 參2是個{}物件，可以配置fetch的方法、以及要儲存的data
    fetch('https://react-backend-25f08-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
    {
      method: 'POST',
      body: JSON.stringify(meetupData), // 要先將物件字串化才能傳送
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(() => {
      navigate('/')
    })
    
  }



  return (
      <div>
          <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                  {/* 因為for為javascript的關鍵字，這裡要用htmlfor */}
                  <label htmlFor='title'>Meetup Title</label>
                  <input type='text' id='title' ref={titleInputRef} required/>
              </div>
              <div className={classes.control}>
                  <label htmlFor='image'>Meetup image</label>
                  <input type='url' id='image' ref={imageInputRef} required />
              </div>
                <div className={classes.control}>
                  <label htmlFor='address'>Meetup address</label>
                  <input type='text' id='address' ref={addressInputRef} required />
              </div>
                <div className={classes.control}>
                  <label htmlFor='description'>Meetup description</label>
                  <input type='text' id='description' ref={descriptionInputRef} required row='5' />
              </div>
              <div className={classes.actions}>
                  <button>Add Meetup</button>
              </div>
          </form>
      </div>
  )
}

export default UpdateProducts