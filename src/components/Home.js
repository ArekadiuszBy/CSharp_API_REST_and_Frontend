import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newCarProducer: '',
            newCarModel: '',
            newCarCapacity: ''
        }
        this.handleNewCarProducerChange = this.handleNewCarProducerChange.bind(this);
        this.handleNewCarModelChange = this.handleNewCarModelChange.bind(this);
        this.handleNewCarCapacityChange = this.handleNewCarCapacityChange.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    handleNewCarProducerChange(event) {
        this.setState({ newCarProducer: event.target.value });
    }

    handleNewCarModelChange(event) {
        this.setState({ newCarModel: event.target.value });
    }

    handleNewCarCapacityChange(event) {
        this.setState({ newCarCapacity: event.target.value });
    }



    getProducts() {
        fetch('http://localhost:64239/api/cars')
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err))
    }

    editProduct(item) {
        const itemsChanged = this.state.items
            .map(_item => ({
                ..._item, "edit": (item.edit ?
                    !item.edit && _item.id === item.id :
                    _item.id === item.id)
            }));
        this.setState({ items: itemsChanged });
        this.setState({
            editedProduct: itemsChanged.find(i => i.id === item.id)
        });
    }

    deleteProduct(id) {
        fetch(`http://localhost:64239/api/cars/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    alert('Nie znaleziono ID');
                }
                this.getProducts();
            })
            .catch(err => console.log(err))
    }

    saveProduct() {
        fetch(`http://localhost:64239/api/cars`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "producer": this.state.newCarProducer,
                "model": this.state.newCarModel,
                "capacity": this.state.newCarCapacity,
            })
        })
            .then(response => {
                if (!response.ok) {
                    alert('Error! Nie mo¿na dodac auta');
                }
                this.getProducts();
            })
            .catch(err => console.log(err))
    }

    render() {
        const listItems = this.state.items.map((item, index) => (
            <div class="inline" key={index.toString()}>
                <div>
                    <h5> ID: {item.id}</h5>  </div>
                <div> <h6> {item.producer} </h6> </div>
                <div><h6>{item.model}</h6></div>
                <div><h6>{ item.capacity }  </h6 > </div>
                <button class="buttondelsmall" onClick={() => this.deleteProduct(item.id)}>Usun</button>
                <button class="buttoneditsmall" onClick={() => this.editProduct(item)}>Edytuj</button>
                {item.edit && this.state.editedProduct.edit &&
                    <div class="form-inline mt-2">
                        <div class="form-group ml-2">
                            <input
                                class="input"
                                value={this.state.editedProduct.name}
                            onChange={this.handleEditProductNameChange} />
                            <input
                            class="input"
                            value={this.state.editedProduct.name}
                            onChange={this.handleEditProductNameChange} />
                            <input
                            class="input"
                            value={this.state.editedProduct.name}
                            onChange={this.handleEditProductNameChange} />
                            <button
                            class="buttoneditsmall2"
                                onClick={() => this.editProduct(true)}>
                                Zapisz
                                </button>
                        </div>
                    </div>
                }
               

            </div>
        ));

        return (
            <div>
                <div>
                    <div>

                        <div>
                            <h2>Marka</h2>
                            <input class="input"
                                value={this.state.newCarProducer}
                                onChange={this.handleNewCarProducerChange} />
                        </div>


                    </div>
                    <div>
                        <h2>Model</h2>
                        <input class="input"
                            value={this.state.newCarModel}
                            onChange={this.handleNewCarModelChange} />
                    </div>
                    <div>
                        <h2>Pojemnosc</h2>
                        <input class="inputcap"
                            value={this.state.newCarCapacity}
                            onChange={this.handleNewCarCapacityChange} />

                        <button class="button" onClick={() => this.saveProduct()}>Zapisz</button>
                        <button class="buttondel" onClick={() => this.deleteProduct()}>Usun</button>

                    </div>


                    {listItems}
                </div>
            </div>
        );
    }
}