import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'
export default function SubSkillPage({ loggedUser }) {
    console.log(loggedUser, "<--- Logged USer in SubSkillPage")




    return (
        <>
            <h1>Subskill page</h1>
        </>
    )
}