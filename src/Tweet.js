import React from 'react';
import { Row, Col, Container} from 'reactstrap';
import Tweets from './TweetView/TweetView';

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      userId:'',
      searchUser:''
    };
  }

  componentDidMount() {
   this.updateUserState();
  }


  
  handleChange =(e)=>{
    this.setState({
      searchUser: e.target.value
    })
  }

  handleSearch = (e)=>{
    e.preventDefault();
    const user = this.state.searchUser
    this.setState({
      userId: user
    })
   this.updateUserState(user);

  }
  
  updateUserState = (user)=>{
  
    if(user){
      fetch(`/api/1.1/statuses/user_timeline.json?screen_name=${user}&count=50`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result
            });
          },
            (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }else{
      fetch(`/api/1.1/statuses/user_timeline.json?screen_name=anandsingh002&count=50`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result
            });
          },
         (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
 }


  
  render() {

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container className="pt-5 pb-5" fluid>
          <Row className="justify-content-center">
            <Col md="3">
            </Col>
            <Col md="6" className="postPosition">
              { items.length > 0 ? <Tweets items={items} error={error} isLoaded={isLoaded} />:<h3>Loading...</h3>}
            </Col>
            <Col md="3">
              <form onSubmit={this.handleSearch}>
                <div className="wrap">
                  <div className="search">
                    <input type="text" className="searchTerm" onChange={this.handleChange} placeholder="Search Twitter" />
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          </Container>
        );
    }
  }
}

export default Tweet;
