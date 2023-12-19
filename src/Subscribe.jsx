import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,

} from "@mui/material";
import Select from '@mui/material/Select';
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'
import LinearProgress from '@mui/material/LinearProgress';
const subscribeSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    batchId: yup.string().required("required"),
    age: yup
        .number()
        .integer("Must be an integer")
        .min(21, "Must be at least 21 years old")
        .max(65, "Must be at most 65 years old")
        .required("required"),

})
const initialValues = {
    name: '',
    email: '',
    age: '',
    batchId: ''

}
const Subscribe = () => {
    const [batches, setBatches] = useState([])
    const [flag, setFlag] = useState(false);
    const getBatches = async () => {
        const response = await fetch('http://localhost:3001/batch')
        const data = await response.json()
        setBatches(data)
    }
    useEffect(() => {
        getBatches()
    }, [])
    const subscribeUser = async (values, onSubmitProps) => {


        const { name } = values;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        const response = await fetch('http://localhost:3001/subscribe', requestOptions)
        const savedUser = await response.json();
        console.log("savedUser", savedUser)
        if (savedUser.success == 'Subscribed') {
            await toast.success(`${name} subscribed successfully`, { position: "top-right", autoClose: 5000 })
            setFlag(false)
            console.log("onSubmitProps", onSubmitProps.resetForm())
        }
        else {
            await toast.error('Subscription failed', { position: "top-right", autoClose: 5000 })
            setFlag(false)
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {

        await subscribeUser(values, onSubmitProps)
    };
    return (
        <Box
            width="100%"
            padding="0.2rem 4%"
            textAlign="center"
            backgroundColor="rgb(246, 246, 246)"
        >
            {flag && <LinearProgress />}
            <Typography fontWeight="bold" fontSize="32px" color="primary">
                YogaPulse
            </Typography>
            <Box
                width="50%"
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                sx={{ boxShadow: 2 }}
                backgroundColor=" rgb(255, 255, 255);"

            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to YogaPulse!
                    Subscribe to YogaPulse
                </Typography>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={subscribeSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="20px"

                            >
                                <TextField
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={Boolean(touched.name) && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Age"
                                    type="age"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.age}
                                    name="age"
                                    error={Boolean(touched.age) && Boolean(errors.age)}
                                    helperText={touched.age && errors.age}
                                    sx={{ gridColumn: "span 4" }}
                                    autoComplete="on"
                                />
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select"
                                        value={values.batchId}
                                        label="Batch"
                                        onChange={handleChange}
                                        name="batchId"
                                    >
                                        {batches?.map((batch) => <MenuItem value={batch.batch_id} key={batch.batch_id}>{batch.timing}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Button

                                    type="submit"
                                    size="medium"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => setFlag(true)}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )

}
export default Subscribe