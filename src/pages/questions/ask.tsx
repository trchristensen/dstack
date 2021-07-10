import React from 'react';
import QuestionComposer from '../../components/QuestionComposer';
import TwoColumnTemplate from '../../components/templates/TwoColumn.Template';


export default function AskPage() {


    return <TwoColumnTemplate main={<QuestionComposer />} />;
}