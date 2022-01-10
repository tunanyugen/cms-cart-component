import "./index.scss";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/js/bootstrap.bundle";
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";
import Checkbox from "@tunanyugen/react-components/src/ts/Form/Checkbox/Checkbox";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import axios from "axios";
import CartManager from "@tunanyugen/cookies/src/Cart";

const id = "c8498c042709011ec90d60242ac120003";

interface ComponentProps { }
 
interface ComponentState {
    location:string;
    items:ItemProps[];
}
//#region Component
class Component extends React.Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            location: "",
            items: []
        }
    }
    componentDidMount(): void {
        CartManager.addItem(1, 1);
        CartManager.addItem(2, 1);
        CartManager.addItem(3, 2);
        let cart = CartManager.get();
        let query = "";
        cart.forEach((quantity, id) => {
            query += `&ids[]=${id}`;
        });
        axios.get(`/api/products?${query}`).then((res) => {
            let items:ItemProps[] = [];
            console.log(res.data)
            if (res.data.items){
                items = res.data.items.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        selected: false,
                        thumbnail: item.banner,
                    }
                })
            }
            this.setState({items: items});
        })
    }
    render() { 
        return (
            <div className="container">
                <div className="left">
                    <Toolbar
                        ItemCount={this.state.items.length}
                        onSelectAllChange={this.setSelectedAll}
                        onDelete={this.deleteSelected}
                        selectedAll={this.selectedAll()}
                    />
                    <Cart
                        items={this.state.items}
                        setSelected={this.setSelected}
                        setQuantity={this.setQuantity}
                    />
                </div>        
                <div className="right">
                    <Location value={this.state.location} onChange={this.setLocation}/>
                    <Summary totalItems={this.totalItems()} totalPrice={this.totalPrice()} />
                </div>
            </div>
        );
    }
    setSelectedAll = (value:boolean) => {
        this.setState({items: this.state.items.map((item) => {
            return { ...item, selected: value }
        })})
    }
    setSelected = (index:number, value:boolean) => {
        let items = [...this.state.items];
        items[index].selected = value;
        this.setState({items});
    }
    deleteSelected = () => {
        let items:ItemProps[] = [];
        this.state.items.forEach((item) => {
            if (!item.selected){ items.push(item) }
        })
        this.setState({items});
    }
    selectedAll = (): boolean => {
        let count = 0;
        this.state.items.forEach((item) => {
            if (item.selected){ count++ }
        })
        return (count == this.state.items.length);
    }
    setQuantity = (index:number, value:number) => {
        let items = [...this.state.items];
        items[index].quantity = value >= 0 ? value : 0;
        this.setState({items});
    }
    setLocation = (value:string) => {
        this.setState({location: value})
    }
    totalItems = () => {
        let total = 0;
        this.state.items.forEach((item) => {
            total += item.quantity;
        })
        return total;
    }
    totalPrice = () => {
        let total = 0;
        this.state.items.forEach((item) => {
            total += item.price * item.quantity;
        })
        return total;
    }
}
//#endregion
//#region Cart
interface CartProps {
    items:ItemProps[];
    setSelected:(index:number, value:boolean) => any;
    setQuantity:(index:number, value:number) => any;
}
 
interface CartState {
    
}
 
class Cart extends React.Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
    }
    render() { 
        return (
            <table className="cart">
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
    renderItems = () => {
        return this.props.items.map((item, index) => {
            return (
                <Item
                    key={item.id}
                    {...item}
                    onSelectedChange={(value) => { this.props.setSelected(index, value) }}
                    onQuantityChange={(value) => { this.props.setQuantity(index, value) }}
                />
            )
        })
    }
}
//#endregion
//#region Item
interface ItemProps {
    id:number,
    name:string,
    price:number,
    quantity:number,
    thumbnail:string,
    selected:boolean,
    onSelectedChange?: (value:boolean) => any,
    onQuantityChange?: (value:number) => any,
}
interface ItemState {
    
}
class Item extends React.Component<ItemProps, ItemState> {
    static defaultProps:ItemProps = {
        id: -1,
        name: "",
        price: -1,
        quantity: -1,
        selected: false,
        thumbnail: "",
        onSelectedChange: () => {},
        onQuantityChange: () => {},
    }
    constructor(props: ItemProps) {
        super(props);
    
    }
    render() { 
        return (
            <tr className="item">
                <td className="item__section item__select">
                    <Checkbox value={this.props.selected} onChange={this.props.onSelectedChange} />
                </td>
                <td className="item__section item__thumbnail">
                    <img src={this.props.thumbnail} />
                </td>
                <td className="item__section item__name">
                    {this.props.name}
                </td>
                <td className="item__section item__price">
                    {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(this.props.price)}
                </td>
                <td className="item__section item__quantity">
                    <Button
                        onClick={() => { this.props.onQuantityChange(this.props.quantity - 1) }}
                    ><i className="fas fa-minus"></i></Button>
                    <div className="item__quantity__display">{this.props.quantity}</div>
                    <Button
                        onClick={() => { this.props.onQuantityChange(this.props.quantity + 1) }}
                    ><i className="fas fa-plus"></i></Button>
                </td>
            </tr>
        );
    }
}
//#endregion
//#region Toolbar
interface ToolbarProps {
    onSelectAllChange:(value:boolean) => any;
    onDelete:React.MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>;
    ItemCount:number;
    selectedAll:boolean;
}
interface ToolbarState {
    
}
class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    static defaultProps:ToolbarProps = {
        ItemCount: 0,
        onDelete: () => {},
        onSelectAllChange: () => {},
        selectedAll: false
    }
    constructor(props: ToolbarProps) {
        super(props);
    }
    render() { 
        return (
            <div className="toolbar">
                <div
                    className="toolbar__select-all"
                >
                    <Checkbox
                        className="toolbar__select-all__checkbox"
                        value={this.props.selectedAll}
                        onChange={this.props.onSelectAllChange}
                    />
                    <p className="toolbar__select-all__text">SELECT ALL ({this.props.ItemCount} ITEMS(S))</p>
                </div>
                <Button
                    className="toolbar__delete"
                    onClick={this.props.onDelete}
                ><i className="far fa-trash-alt"></i></Button>
            </div>
        );
    }
}
// #endregion
//#region Location
interface LocationProps {
    value:string;
    onChange:(value:string) => any
}
 
interface LocationState {
    
}
 
class Location extends React.Component<LocationProps, LocationState> {
    constructor(props: LocationProps) {
        super(props);
    }
    render() { 
        return (
            <div className="location">
                <Input label="Location" value={this.props.value} onChange={(e) => { this.props.onChange(e.target.value) }} />
            </div>
        );
    }
}
//#endregion
//#region Summary
interface SummaryProps {
    totalItems:number;
    totalPrice:number;   
}
 
interface SummaryState {
    
}
 
class Summary extends React.Component<SummaryProps, SummaryState> {
    constructor(props: SummaryProps) {
        super(props);
    }
    render() { 
        return (
            <React.Fragment>
                <div className="summary__title">Order Summary</div>
                <table className="summary">
                    <tbody>
                        <tr>
                            <td>Total ({this.props.totalItems} item(s))</td>
                            <td className="summary__total">
                                {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(this.props.totalPrice)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className="summary__confirm">Confirm ({this.props.totalItems})</Button>
            </React.Fragment>
        );
    }
}
//#endregion
ReactDOM.render(
    <Component />,
    document.getElementById(id)
)