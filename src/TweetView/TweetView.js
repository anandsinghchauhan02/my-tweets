import React from 'react';
import { Row, Col,Card, CardBody } from 'reactstrap';

const Tweets = (props) =>{
    return(
        <>
            {props.items.map(({ user, ...item }) => {
                if (!!item.retweeted_status) {
                    user = { ...item.retweeted_status.user }
                }
                
                return (
                    <Card className="border-bottom-0 rounded-0" key={item.id}>
                        <CardBody>
                            <Row>
                                <Col sm="1" className="p-1">
                                    <img className="rounded-circle w-100 img-fluid" src={user.profile_image_url} alt="image" />
                                </Col>
                                <Col >
                                    <h5>
                                        {user.name}
                                        <small className="ml-2">
                                            {item.created_at}
                                        </small>
                                    </h5>
                                    <h6>
                                        {item.text}
                                    </h6>
                                    <div>

                                        {
                                            item.extended_entities && (
                                                item.extended_entities.media.map(({ media_url = '' }) => {
                                                    return (<img className="img-fluid rounded" src={media_url} alt="image" />)

                                                })
                                            )
                                        }
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                )
            })}
        </>
    )
}

export default Tweets;