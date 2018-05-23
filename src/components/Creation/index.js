import React, { Component } from "react";
import VinylRecord from "../VinylRecord";
import RoundBtn from "../RoundBtn";
import "./index.scss";
class Creation extends Component {
    constructor(props) {
        super(props);

        console.log(props.match.params.cid);
    }

    render() {
        return (
            <div>
                <div className="creation">
                    <div className="creation__vinylRecordContainer">
                        <VinylRecord
                            ref="vinylRecord"
                            defaultMode="cdplayer"
                            onPlayerEnd={() => {
                                console.log("end");
                            }}
                        />
                    </div>
                    <RoundBtn
                        onClick={() => {
                            this.refs.vinylRecord.play();
                        }}
                    >
                        PLAY
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

export default Creation;
