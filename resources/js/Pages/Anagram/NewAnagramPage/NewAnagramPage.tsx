import React, { useState, useEffect, FormEvent, FormEventHandler } from 'react';
import { Alert, Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

import DisciplineSelect from 'components/DisciplineSelect/DisciplineSelect';
import LayoutSelect from 'components/LayoutSelect/LayoutSelect';
import SeriesSelect from 'components/SeriesSelect/SeriesSelect';
import SuccessModal from 'components/SuccessModal/SuccessModal';
import BackFAButton from 'components/BackFAButton/BackFAButton';
import AnagramPage from 'components/AnagramPage/AnagramPage';
import { useCreateGameObjectMutation } from 'services/portal';
import { useCreateAnagramMutation } from 'services/games';
import { getError } from 'utils/errors';
import { RootState } from 'store';

const NewAnagramPage = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [createAnagram, response] = useCreateAnagramMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [pages, setPages] = useState([['', '', '', '']]);
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de páginas nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push(['', '', '', '']);
        setPages(p);
    };

    const handleClose = () => {
        setPages([['', '', '', '']]);
        setLayout(1);
        setName('');
        setOpen(false);
    };

    const handleSubmit: FormEventHandler = (event: FormEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let wordsJson: string[] = [];
        pages.map((page) => {
            page.map((item) => {
                wordsJson.push(item);
            });
        });

        const body = {
            name: name,
            layout: layout,
            options: wordsJson,
        };
        createAnagram(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj = {
                name: response?.data?.name as string,
                slug: `/anagram/${response?.data?.slug}`,
                material: `https://fabricadejogos.portaleducacional.tec.br/game/anagram/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie,
            };
            createGameObject({ origin, token, ...obj });
        }
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true);
        responsePortal.isError && setAlert(getError(responsePortal.error));
    }, [responsePortal.isLoading]);

    return (
        <>
            <BackFAButton />
            <SuccessModal open={open} handleClose={handleClose} />
            <Grid
                container
                alignSelf="center"
                alignItems="center"
                justifyContent="center"
                component="form"
                sx={{ marginTop: 8 }}
                onSubmit={handleSubmit}
                spacing={3}
            >
                <Grid item alignSelf="center" textAlign="center" xs={12}>
                    <Typography color="primary" variant="h2" component="h2">
                        <b>Anagrama</b>
                    </Typography>
                </Grid>
                <Grid
                    alignSelf="center"
                    item
                    xl={4}
                    lg={3}
                    md={12}
                    justifyContent={{ lg: 'flex-end', md: 'none' }}
                    display={{ lg: 'flex', md: 'block' }}
                >
                    <SeriesSelect value={serie} setValue={setSerie} />
                </Grid>
                <Grid item alignSelf="center" xl={4} lg={3}>
                    <TextField
                        label="Nome"
                        name="name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        sx={{ minWidth: { sm: 290, xs: 260 } }}
                        fullWidth
                    />
                </Grid>
                <Grid
                    alignSelf="center"
                    item
                    justifyContent={{
                        lg: 'flex-start',
                        md: 'none',
                    }}
                    display={{ lg: 'flex', md: 'block' }}
                    xl={4}
                    lg={3}
                    md={12}
                >
                    <DisciplineSelect value={discipline} setValue={setDiscipline} />
                </Grid>
                <Grid item alignSelf="center" xs={12}>
                    <LayoutSelect value={layout} setValue={setLayout} />
                </Grid>
                <Grid item alignSelf="center" xs={12}>
                    <Button onClick={handleAddWord} endIcon={<AddIcon fontSize="small" />} variant="contained">
                        Adicionar Pagina
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignSelf="center" alignItems="flex-start" justifyContent="center" spacing={5}>
                        {alert && (
                            <Grid item xs={12}>
                                <Alert
                                    severity="warning"
                                    onClick={() => {
                                        setAlert('');
                                    }}
                                >
                                    {alert}
                                </Alert>
                            </Grid>
                        )}
                        {pages.map((page: string[], index: number) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <AnagramPage index={index} value={page} state={pages} setState={setPages} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                {/* @ts-ignore */}
                <Grid item align="center" xs={12}>
                    {response.isLoading || responsePortal.isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button size="large" type="submit" variant="outlined">
                            Salvar
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default NewAnagramPage;
