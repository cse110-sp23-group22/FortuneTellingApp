Team 22 ADR 2023-6-2
parent: CI Pipeline Decisions
nav_order: 100
title: E2E Testing ADR

## Status: accepted
## date: 2023-6-02
## Deciders: Jinshi He, Nikan Ostovan, Jennifer Tanurdjaja

## Context and Problem Statement
What testing methods should be used for the Horoscope module to efficiently test its functionality

## Considered Options
After clicking questionnaire button, check if localStorage stores the right thing
After clicking button in horoscope, check if it goes back to the main page
After clicking the last continue button in questionnaire.html, check if the output page’s content corresponds to the content of the localStorage 

## Decision Outcome
Include all three of them - prioritize this along with unit testing the page itself. 


### Consequences	
Simulate a user-flow through E2E testing may find errors between pages but that is something that should be focused on based on the setup of our application. 
