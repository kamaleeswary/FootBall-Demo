import classes from "./MatchDetails.module.css";
import Tilt from "react-vanilla-tilt";
import CompareTeam from "./CompareTeam";
import LoadingSpinner from "../UI/LoadingSpinner";

const MatchDetails = (props) => {

  let index = 0;
  const matchData = props.matchData;
  const imageContainer = props.images.map((image, i) => {
    index++;
    return (
      <img
        src={image.img}
        style={{ "--delay": index }}
        alt="..."
        className={classes.pimg}
        key={i}
      />
    );
  });

  return (
    <section className={classes.body}>
      {matchData && (
        <div className={classes.container}>
          <Tilt className={classes.box} options={{ speed: 400, max: 25 }}>
            <h2 className={classes.name}>{matchData[0].teamName}</h2>
            {/* <a href="#" className={classes.buy}>Win</a> */}
            <div className={classes.circle}></div>
            {imageContainer}
          </Tilt>
          <CompareTeam />
          <Tilt className={classes.box} options={{ speed: 400, max: 25 }}>
            {matchData && (
              <h2 className={classes.name}>{matchData[1].teamName}</h2>
            )}
            {/* <a href="#" className={classes.buy}>Win</a> */}
            <div className={classes.circle}></div>
            {imageContainer}
          </Tilt>
        </div>
      )}
     {matchData && matchData.message && (
        <section>
          <div className={classes.align}><p>{matchData.message + 'Please Try After SomeTime.' }</p></div>
           <div className={classes.align}> <LoadingSpinner /></div>
        </section>
      )}
    </section>
  );
};

export default MatchDetails;
