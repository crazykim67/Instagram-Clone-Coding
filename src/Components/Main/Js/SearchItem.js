import '../Css/SearchItem.css';

function SearchItem(){
  return (
    <div className='search-item'>
      <div>
        <div className='search-box'>
          <div className='search-item-profile'>
            <img src={require('../../Image/my.jpg')}/>
          </div>
          <div className='search-item-info'>
            <span className='search-info-nick'>닉네임</span>
            <span className='search-info-name'>이름</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem;