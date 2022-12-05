import classes from "./FilteredTeams.module.css";

const FilteredTeams = (props) => {
  const players = props.players;
  let index = 0;
  const cards = players.map((player, id) => {
    index++
    return (
      <div className={classes.card} key={id} style={{ '--delay': index}}>
        <div className={classes.content + " mb-3"}>
            <div className={classes.img}>
              <img
                src={player.img}
                alt="..."
              />
            </div>
           <div className={classes.details}>
           <span className={classes.name}>{player.name}</span>
            <p className="card-text">{player.gender}</p>
           </div>
          </div>
        </div>
    );
  }
  );
  return <section> {players.length > 0 && <div className={classes.wrapper}>{cards}</div>}</section>
};

export default FilteredTeams;
