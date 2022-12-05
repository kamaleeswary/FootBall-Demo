import classes from './MatchDetails.module.css';
import Tilt from 'react-vanilla-tilt'
import CompareTeam from './CompareTeam';

const MatchDetails = () => {

    const images = [
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_WM6mx1ViU824UfaLExCk-pJIC3ITPb4kg&usqp=CAU",
            no: 1,
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlnzjwsEET1ILECT87npfWWCGLXjOnCnNTQ&usqp=CAU",
            no: 2,
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTST7rLZbI4OcZm1M2t4lG9MmdNFAT-xTiNPA&usqp=CAU",
            no: 3
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYV3d20jALckBRqwgRFeAYldwpoPeakhEgSw&usqp=CAU",
            no: 4
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N-2M9ZwXyysmn1EN4RO3Pe_GEl7yppMK7g&usqp=CAU",
            no: 5
        }
    ];
    let index = 0;
    const imageContainer = images.map((image, i) => {
        index++;
        return (
            <img src={image.img} style={{ '--delay': index}} alt="..." className={classes.pimg} key={i}/>
        )
    })
return (
    <section className={classes.body}>
     <div className={classes.container}>
     <Tilt   className={classes.box}  options={{ speed: 400, max: 25 }}> 
            <h2 className={classes.name}>Team A</h2>
            {/* <a href="#" className={classes.buy}>Win</a> */}
            <div className={classes.circle}></div>
            {imageContainer}
    </Tilt>
    <CompareTeam/>
    <Tilt  className={classes.box} options={{ speed: 400, max: 25 }}> 
            <h2 className={classes.name}>Team B</h2>
            {/* <a href="#" className={classes.buy}>Win</a> */}
            <div className={classes.circle}></div>
            {imageContainer}
    </Tilt>
    </div>
   </section>
   )
}

export default MatchDetails;