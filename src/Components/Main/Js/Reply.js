function Reply() {
  return(
    <div className='reply-comment'>
      <li>
        <div className='comment-writing'>
          <div>

            <div className='write-profile'>
              <img alt='프로필' src={require('../../Image/my.jpg')}/>
            </div>

            <div className='write-comment'>

              <h2>닉네임</h2>
              <span className='main-text'>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </span>

              <div className='text-content'>
                <span>41주</span>
              </div>

            </div>

          </div>
        </div>
      </li>
    </div>
  )
}

export default Reply;