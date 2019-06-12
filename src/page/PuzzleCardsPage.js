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
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            })
        }
    };
};
@connect(mapStateTopProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }
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
                {/*<div>*/}
                {/*    <button onClick={() => this.props.onClickAdd({*/}
                {/*        setup: 'good good study',*/}
                {/*        punchline: 'day day up',*/}
                {/*    })}>添加卡片*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onClickAdd: (newCard) => {
//             const action = {
//                 type: `${namespace}/queryInitCards`,
//                 payload: newCard,
//             };
//             dispatch(action);
//         },
//     };
// };