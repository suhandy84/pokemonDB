import React, { Component } from "react";
import Axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'


class Home extends Component {
    state = {
        data: [],
        offset: 0,
        perPage: 60,
        currentPage: 0
    }

    componentDidMount() {
        this.receivedData()
    }

    receivedData() {
        Axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`)
            .then((res) => {
                const data = res.data.results;
                console.log(res.data.results)
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(val => <React.Fragment>
                    <div className="col-sm-6 col-md-6 col-lg-4 mb-5 topic-header-2">
                    {/* <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${val.name}.jpg`}/> */}
                        <div style={{ backgroundImage: "linear-gradient(103deg,#062c57,#2d6ea3)" }} className="topic-header">
                            
                                <div className="title mb-3">
                                    {/* {val.name[0].toUpperCase()+val.name.slice(1)} */}
                                    {this.capitalizeFirstLetter(val.name)}
                                </div>
                            
                                <div className="">
                                    <Link to={`/pokemondetail/${val.name}`}>
                                        <button type="button" class="btn btn-primary">Detail</button>
                                    </Link>
                                </div>
                        </div>
                    </div>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render() {
        return (
            <div>
                <div className="judul text-center mt-3">
                    POKEMON DATABASE
                </div>
                <div className="container mt-2 ml-2">
                    <div className="row">
                        {this.state.postData}
                        <div className="d-flex justify-content-center">
                            <ReactPaginate 
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            />

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;