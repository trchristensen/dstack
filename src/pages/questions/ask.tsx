import React from 'react';
import {Container} from '../../components/Container'
import QuestionComposer from '../../components/QuestionComposer';
import ThreeColumn from '../../components/templates/Sidebar.Template'
import TwoColumnTemplate from '../../components/templates/TwoColumn.Template';


export default function AskPage() {


    return <TwoColumnTemplate main={<QuestionComposer />} />;
}