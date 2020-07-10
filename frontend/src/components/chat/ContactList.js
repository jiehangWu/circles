import Grid from '@material-ui/core/Grid';
import Contact from "./Contact";
import Avatar from '@material-ui/core/Avatar';
import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { HomeActions } from "../../actions/home.actions";
import { connect } from "react-redux";


export function ContactList(props) {
    const [users, setContacts] = useState([]);

    useEffect(() => {
        setContacts(props.contacts)
    }, [props.contacts]);
    return <React.Fragment>
        <Grid container direction="column" alignItems="flex-start" style={{ width: "50%" }}>
            {
                props.contacts.map((ele) => {
                    return <Contact name={ele} />;
                })
            }
        </Grid>
    </React.Fragment>
}

const mapStateToProps = (state) => {
    return { contacts: state.contacts };
};

const mapAction = {
    loadHome: HomeActions.loadHome,
};

export default connect(mapStateToProps, {})(ContactList);