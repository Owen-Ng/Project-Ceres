import React, { Component } from 'react';
import "./admin-search.css"
import AdminResults from '../AdminResults/admin-results.component';


export default class AdminSearch extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            familyName:"",
            storeName: "",
            tribeName: "",
            searchType: "family",

            familyList: this.props.familyList,
            storeList: this.props.storeList,
            tribeList: this.props.tribeList,

            autoSuggestList: []

        }
        this.showPanel = this.showPanel.bind(this)

        this.familyMode = this.familyMode.bind(this)
        this.storeMode = this.storeMode.bind(this)
        this.tribeMode = this.tribeMode.bind(this)

        this.autoSuggestFamily = this.autoSuggestFamily.bind(this)
        this.autoSuggestStore = this.autoSuggestStore.bind(this)
        this.autoSuggestTribe = this.autoSuggestTribe.bind(this)

    }

    componentDidMount(){
        this.setState({searchType: "family"})
        this.familyMode()
    }
    /* 
    This is a middle man function that passes the results up to settings (which is the main page for this feature).
    */
    showPanel(selectedItem, searchType){ this.props.showPanel(selectedItem, searchType) }

    familyMode(){ this.setState({searchType: "family", autoSuggestList: Object.keys(this.props.familyList).sort()})}
    storeMode(){ this.setState({searchType: "store", autoSuggestList: Object.keys(this.props.storeList).sort()})}
    tribeMode(){ this.setState({searchType: "tribe", autoSuggestList: Object.keys(this.props.tribeList).sort()})}

    autoSuggestFamily(e){
   
            this.setState({ [e.target.name]: e.target.value })
            const list = this.props.familyList
            const currentText = e.target.value.toLowerCase()
            const matches = Object.keys(list).filter(listItem => currentText === listItem.toLowerCase().substring(0, currentText.length))
            this.setState({autoSuggestList: matches.sort()})
    }

    autoSuggestStore(e){
        this.setState({ [e.target.name]: e.target.value })
        const list = this.props.storeList
        const currentText = e.target.value.toLowerCase()
        const matches = Object.keys(list).filter(listItem => currentText === listItem.toLowerCase().substring(0, currentText.length))

        this.setState({autoSuggestList: matches.sort()})

    }

    autoSuggestTribe(e){
        this.setState({ [e.target.name]: e.target.value })
        const list = this.props.tribeList
        const currentText = e.target.value.toLowerCase()
        const matches = Object.keys(list).filter(listItem => currentText === listItem.toLowerCase().substring(0, currentText.length))

        this.setState({autoSuggestList: matches.sort()})

    }

    render() {
        const userSearch = 
        <div>
            <form >
                <input 
                    className="AdminSearch-search-input"
                    name="familyName"
                    type="text"    
                    placeholder="Enter family name"
                    onChange={this.autoSuggestFamily}
                    value={this.state.familyName}
                    autoComplete="off"
                />

            </form>
            <AdminResults
                searchableObject={this.state.familyList}
                list={this.state.autoSuggestList}
                searchType="family"
                showPanel={this.showPanel}
                
            />
        </div>
            
        const storeSearch = 
        <div>
            <form >
                <input 
                    className="AdminSearch-search-input"
                    name="storeName"
                    type="text"    
                    placeholder="Enter store address"
                    onChange={this.autoSuggestStore}
                    value={this.state.storeName}
                    autoComplete="off"
                />
         
            </form>
            <AdminResults
                searchableObject={this.state.storeList}
                list={this.state.autoSuggestList}
                searchType="store"
                showPanel={this.showPanel}

            />
        </div>
            
        const tribeSearch = 
            <div>
                <form >
                    <input 
                        className="AdminSearch-search-input"
                        name="tribeName"
                        type="text"    
                        placeholder="Enter tribe name"
                        onChange={this.autoSuggestTribe}
                        value={this.state.tribeName}
                        autoComplete="off"
                    />
    
                </form>
                <AdminResults 
                    searchableObject={this.state.tribeList}
                    list={this.state.autoSuggestList}
                    searchType="tribe"
                    showPanel={this.showPanel}
                />
             </div>
            
        return (
            <div className="AdminSearch"> 

                <h6 className="AdminSearch-title">Search for </h6>   
                <div className="btn-group" role="group" >
                    <button type="button" className="btn btn-secondary" onClick={this.familyMode}>Family</button>
                    <button type="button" className="btn btn-secondary" onClick={this.storeMode}>Store</button>
                    <button type="button" className="btn btn-secondary" onClick={this.tribeMode}>Tribe</button>
                </div>

                {(this.state.searchType === "family") ? userSearch : ""}
                {(this.state.searchType === "store") ? storeSearch : ""}
                {(this.state.searchType === "tribe") ? tribeSearch : ""}   
                
                
            </div>
        )
    }
    

}

