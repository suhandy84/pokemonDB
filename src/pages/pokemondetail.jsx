import React, { Component } from "react";
import Axios from 'axios'

class Detail extends Component {
    state = {
        name: "",
        species: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: ""
    }

    componentDidMount() {
        console.log()
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.name}`)
            .then((res) => {
                console.log(res.data)
                // console.log(res.data.stats[0].base_stat)
                
                this.setState({
                    name: res.data.name,
                    species: res.data.species.name,
                    image: res.data.sprites.front_default,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    type: res.data.types[0].type.name
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render() {
        const { name, image, species, hp, attack, defense, type } = this.state
        return (
            <div className="detail mt-5 mb-5">
                <div className="title-detail mt-3 mb-5">
                    <h1>
                        Pokemon Stats
                    </h1>

                </div>
                <div className="stats-detail">
                    <h1>{name.toUpperCase()}</h1>
                    <img src={image} />
                    <h3>Species: {this.capitalizeFirstLetter(species)}</h3>
                    <h3>HP: {hp}</h3>
                    <h3>Attack: {attack}</h3>
                    <h3>Defense: {defense}</h3>
                    <h3>Type: {this.capitalizeFirstLetter(type)}</h3>
                </div>


            </div>
        );
    }
}

export default Detail;