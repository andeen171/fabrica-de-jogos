import React, { useState, useEffect, FormEvent, FormEventHandler, FunctionComponent } from 'react'
import { Alert, Button, Grid, TextField, Typography, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'

import DisciplineSelect from 'components/DisciplineSelect/DisciplineSelect'
import LayoutSelect from 'components/LayoutSelect/LayoutSelect'
import SeriesSelect from 'components/SeriesSelect/SeriesSelect'
import SuccessModal from 'components/SuccessModal/SuccessModal'
import BackFAButton from 'components/BackFAButton/BackFAButton'
import AnagramCell from 'components/AnagramCell/AnagramCell'
import { useCreateGameObjectMutation } from 'services/portal'
import { useCreateAnagramMutation } from 'services/games'
import { getError } from 'utils/errors'
import { RootState } from 'store'

const NewAnagramPage: FunctionComponent = ({}) => {
    const { token, origin } = useSelector((state: RootState) => state.user)
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState('')
    const [createAnagram, response] = useCreateAnagramMutation()
    const [createGameObject, responsePortal] = useCreateGameObjectMutation()
    const [name, setName] = useState('')
    const [layout, setLayout] = useState(1)
    const [serie, setSerie] = useState<string[]>([])
    const [discipline, setDiscipline] = useState('')
    const [pages, setPages] = useState([['', '', '', '']])
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de páginas nesse jogo é 8!')
            return
        }
        let p = [...pages]
        p.push(['', '', '', ''])
        setPages(p)
    }

    const handleClose = () => {
        setPages([['', '', '', '']])
        setLayout(1)
        setName('')
        setOpen(false)
    }

    const handleSubmit: FormEventHandler = (event: FormEvent<HTMLInputElement>): void => {
        event.preventDefault()
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!')
            return
        }
        if (serie === ['']) {
            setAlert('Selecione uma série!')
            return
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!')
            return
        }
        let wordsJson: string[] = []
        pages.map((page) => {
            page.map((item) => {
                wordsJson.push(item)
            })
        })

        const body = {
            name: name,
            layout: layout,
            options: wordsJson,
        }
        createAnagram(body)
    }

    useEffect(() => {
        if (response.isSuccess) {
            const obj = {
                name: response?.data?.name as string,
                slug: `/anagram/${response?.data?.slug}`,
                material: `https://fabricadejogos.portaleducacional.tec.br/game/anagram/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie,
            }
            createGameObject({ origin, token, ...obj })
        }
        response.isError && setAlert(getError(response.error))
    }, [response.isLoading])

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true)
        responsePortal.isError && setAlert(getError(responsePortal.error))
    }, [responsePortal.isLoading])

    return (
        <>
            <BackFAButton />
            <SuccessModal open={open} handleClose={handleClose} />
            <Grid
                container
                marginTop={2}
                alignItems="center"
                justifyContent="center"
                direction="column"
                component="form"
                onSubmit={handleSubmit}
                spacing={2}
                textAlign="center"
            >
                <Grid item>
                    <Typography color="primary" variant="h2" component="h2">
                        <b>Anagrama</b>
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction={{ lg: 'row', md: 'column' }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item justifyContent="flex-end" display="flex" lg={4} md={12}>
                        <SeriesSelect value={serie} setValue={setSerie} />
                    </Grid>
                    <Grid item lg={4} md={12}>
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
                    <Grid item justifyContent="flex-start" display="flex" lg={4} md={12}>
                        <DisciplineSelect value={discipline} setValue={setDiscipline} />
                    </Grid>
                </Grid>
                <Grid item container alignItems="flex-start" justifyContent="center" spacing={5}>
                    <Grid item xs={12}>
                        <LayoutSelect value={layout} setValue={setLayout} />
                    </Grid>
                    {alert && (
                        <Grid item xs={12}>
                            <Alert
                                severity="warning"
                                onClick={() => {
                                    setAlert('')
                                }}
                            >
                                {alert}
                            </Alert>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button onClick={handleAddWord} endIcon={<AddIcon fontSize="small" />} variant="contained">
                            Adicionar Pagina
                        </Button>
                    </Grid>
                    {pages.map((page: string[], index: number) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <AnagramCell index={index} value={page} state={pages} setState={setPages} />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item>
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
    )
}

export default NewAnagramPage
