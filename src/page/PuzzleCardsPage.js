import React, {Component} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';

const namespace = 'puzzleCards';

const mapStateTopProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newCard) => {
            const action = {
                type: `${namespace}/queryInitCards`,
                payload: newCard,
            };
            dispatch(action);
        },
    };
};

@connect(mapStateTopProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    render() {
        return (
            <div>
                {
                    this.props.cardList.map(
                        card => {
                            return (
                                <Card key={card.id}>
                                    <div>Q:{card.setup}</div>
                                    <div>
                                        <strong>A:{card.punchline}</strong>
                                    </div>
                                </Card>
                            );
                        }
                    )
                }
                <div>
                    <button onClick={() => this.props.onClickAdd({
                        setup: 'good good study',
                        punchline: 'day day up',
                    })}>添加卡片
                    </button>
                </div>
            </div>
        );
    }

    // constructor(props) {
    //     super(props);
    //     this.counter = 100;
    //     this.state = {
    //         cardList: [
    //             {
    //                 id: 1,
    //                 setup: 'Did you hear about hte two silk worms in a race?',
    //                 punchline: 'It ended in a tie',
    //             },
    //             {
    //                 id: 2,
    //                 setup: 'What happens to a frog car when it breaks down?',
    //                 punchline: 'It gets toad away',
    //             },
    //         ],
    //     }
    // }
    // addNewCart = () => {
    //     this.setState(state => {
    //         const prevCardList = state.cardList;
    //         this.counter++;
    //         const card = {
    //             id: this.counter,
    //             setup: '这个怎么样？',
    //             punchline: '还是很不错的'
    //         };
    //         return {
    //             cardList: prevCardList.concat(card),
    //         };
    //     });
    // };
}