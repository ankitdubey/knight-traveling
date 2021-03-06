import React, { Fragment } from "react";

class DrawBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 1,
      xValue: 0,
      yValue: 0,
      possibleCoordinates: [],
      coordinateOutOfBox: false,
      visitedCordinates:[]
    };

    this.setXCordinate = this.setXCordinate.bind(this);
    this.setYCordinate = this.setYCordinate.bind(this);
    this.startGame = this.startGame.bind(this);
    this.setBordSize = this.setBordSize.bind(this);
  }

  setXCordinate(event) {
    event.preventDefault();
    this.setState({ xValue: event.target.value });
  }
  setYCordinate(event) {
    event.preventDefault();
    this.setState({ yValue: event.target.value });
  }

  setBordSize(event) {
    event.preventDefault();
    this.setState({ boardSize: event.target.value });
  }

  startGame() {
    const { boardSize, xValue, yValue } = this.state;
    if (
      xValue <= 0 ||
      xValue > boardSize ||
      yValue <= 0 ||
      yValue > boardSize
    ) {
      this.setState({
        coordinateOutOfBox: true,
      });
    } else {
      let coordinate=[parseInt(xValue),parseInt(yValue)];
      let visitedCordinates=this.state.visitedCordinates;
      let isAlreadyVisited=false;
        if(visitedCordinates.length>0){
          for(let i=0;i<visitedCordinates.length;i++){

            if(visitedCordinates[i].toString()==coordinate.toString()){
              console.log("Already visited");
              isAlreadyVisited=true;
            }
          }
        }
     
        if(!isAlreadyVisited){
        visitedCordinates.push(coordinate);
        this.setState({
          visitedCordinates:visitedCordinates,
          isAlreadyVisited:isAlreadyVisited,
          coordinateOutOfBox:false,
        })
        this.travleKnight(xValue, yValue, boardSize);
      }else{
        this.setState({
          isAlreadyVisited:isAlreadyVisited,
          coordinateOutOfBox:false
        })
      }

     
     
    }
  }

  travleKnight(x, y, n) {
    var possibleCoordinates = [];
    var cellX = parseInt(x); //The X Position
    var cellY = parseInt(y); //The Y Position
    var size = n;

    //Find all possible X Positions
    var cellXpositions = [cellX + 2, cellX - 2, cellX + 1, cellX - 1];
    cellXpositions = cellXpositions.filter(function (cellPosition) {
      return cellPosition > 0 && cellPosition < size + 1;
    });

    //Find all possible Y Positions
    var cellYpositions = [cellY + 2, cellY - 2, cellY + 1, cellY - 1].filter(
      function (cellPosition) {
        return cellPosition > 0 && cellPosition < size + 1;
      }
    );

    for (var i = 0; i < cellXpositions.length; i++) {
      for (var j = 0; j < cellYpositions.length; j++) {
        if (
          Math.abs(cellX - cellXpositions[i]) +
            Math.abs(cellY - cellYpositions[j]) ===
          3
        ) {
          console.log("This is a valid coordinate: ", [
            cellXpositions[i],
            cellYpositions[j],
          ]);
          if (
            !possibleCoordinates.includes([
              cellXpositions[i],
              cellYpositions[j],
            ])
          ) {
            possibleCoordinates.push([cellXpositions[i], cellYpositions[j]]);
          }
        }
      }
    }
    this.setState({
      possibleCoordinates: possibleCoordinates,
    });
    console.log("Possible Coordinates:", possibleCoordinates);
    console.log("Possible Moves:", possibleCoordinates.length);
    return possibleCoordinates.length;
  }

  render() {
    return (
      <Fragment>
        <div className="App mt-3">
          <div className="container">
            <div className="row mb-2">
              <div className="col-4"></div>
              <div className="col-4">
                <form>
                  <div className="form-group">
                    <input
                      placeholder="Enter X coordinate"
                      type="number"
                      className="form-control"
                      id="rows"
                      name="rows"
                      onChange={this.setXCordinate}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Enter the Y coordinate"
                      type="number"
                      className="form-control"
                      id="columns"
                      name="columns"
                      onChange={this.setYCordinate}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Enter the size of board"
                      type="number"
                      className="form-control"
                      id="columns"
                      name="columns"
                      onChange={this.setBordSize}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    name="startButton"
                    value=" Start"
                    onClick={this.startGame}
                  >
                    Start Travelling Knight
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-4">
                <p>
                  Possible Coordinates :{" "}
                  <code>{JSON.stringify(this.state.possibleCoordinates)}</code>
                </p>
              </div>
            </div>
            {this.state.coordinateOutOfBox && (
              <div className="row">
                <div className="col-4 offset-4">
                  <p style={{ color: "red" }}>
                    * Coordinates out of the board size.
                  </p>
                </div>
              </div>
            )}
            <div className="row">
                <div className="col-4 offset-4">
                  <p >
                    Visited Coordinates:{JSON.stringify(this.state.visitedCordinates)}
                  </p>
                </div>
              </div>
              {this.state.isAlreadyVisited && (
                      <div className="row">
                      <div className="col-4 offset-4">
                        <p style={{ color: "red" }}>
                          * Coordinates are already visited, please change the values of Coordinates
                        </p>
                      </div>
                    </div>
              )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DrawBoard;
