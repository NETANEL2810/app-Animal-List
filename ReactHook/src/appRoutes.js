import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddAnimalForm from './components/animals/addAnimalForm'
import AnimalsList from './components/animals/animalsList'
import Header from './components/general/header'
import Home from './components/home'
import Page404 from './components/page404'
import EditAnimalForm from './components/animals/editAnimalForm'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/animals" element={<AnimalsList />} />
                <Route path="/animals/add" element={<AddAnimalForm />} />
                <Route path="/animals/edit/:id" element={<EditAnimalForm/>} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
