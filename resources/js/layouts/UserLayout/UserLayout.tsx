import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, CssBaseline } from '@mui/material';
import { Outlet, useSearchParams } from 'react-router-dom';

import Copyright from 'components/Copyright/Copyright';
import { setBaseState } from 'reducers/userReducer';
import NavBar from 'components/NavBar/NavBar';

const UserLayout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchParams.has('user_token') && searchParams.has('api_address')) {
            localStorage.setItem('token', searchParams.get('user_token') as string);
            const uri = decodeURI(searchParams.get('api_address') as string).replace('/api/', '');
            localStorage.setItem('origin', uri);
            dispatch(setBaseState());
            searchParams.delete('api_address');
            searchParams.delete('user_token');
            setSearchParams(searchParams);
            return;
        }
        if (!localStorage.getItem('token') || !localStorage.getItem('origin')) {
            window.location.href = '/401';
        }
    }, []);

    return (
        <>
            <NavBar />
            <CssBaseline />
            <Container maxWidth="xl" component="main">
                <Outlet />
            </Container>
            <Copyright />
        </>
    );
};

export default UserLayout;
