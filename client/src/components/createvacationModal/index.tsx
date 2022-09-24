import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { BaseApi } from "../../services/BaseApi"

export const CreateProductModal = (props: any) => {
    const { isOpen, setIsModalOpen, refresh, setIsEdit, isEdit, setRowData, rowData } = props
    const [name, setName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [price, setPrice] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([] as any)

    useEffect(() => {

        setName(rowData.name ?? "")
        setPhotoUrl(rowData.photoUrl ?? "")
        setPrice(rowData.price ?? "")
        setCategoryId(rowData.category ?? "")

    }, [isEdit])

    useEffect(() => {
        getCategories()

    }, [])



    const getCategories = async () => {
        try {
            const res = await BaseApi.getCategories()
            setCategories(res?.data?.results)

        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        if (isEdit) {
            await BaseApi.updateProduct(rowData.id, { name, photoUrl, price, categoryId })
        } else {
            await BaseApi.createProduct({ name, photoUrl, price, categoryId })
        }

        handleClose()

        refresh(true)
    }

    const handleClose = () => {


        setName("")
        setPhotoUrl("")
        setPrice("")
        setCategoryId("")
        setRowData({})
        setIsModalOpen(false)
        setIsEdit(false)


    }

    return (
        <Modal open={isOpen} onClose={() => {
            setIsModalOpen(false)
            handleClose()
        }} >
            <Paper>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                }}>
                    <h2 id="parent-modal-title">{isEdit ? "Edit vacation" : "create vacation"}</h2>
                    <Box sx={{ mt: 2 }}>
                        <TextField sx={{ my: 1 }} value={name} onChange={(e) => setName(e.target.value)} id="name" label="name" variant="outlined" fullWidth />
                        <TextField sx={{ my: 1 }} value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} id="pictureUrl" label="pictureUrl" variant="outlined" fullWidth />
                        <TextField sx={{ my: 1 }} value={price} onChange={(e) => setPrice(e.target.value)} id="price" label="price" variant="outlined" fullWidth />

                        <FormControl sx={{ my: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category"
                                onChange={(e) => { setCategoryId(e.target.value) }}
                            >
                                {categories ? categories?.map((c: any) => {
                                    return <MenuItem value={c?.id}>{c?.catagoryName}</MenuItem>
                                }) : null}
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="primary" onClick={() => { handleSubmit() }}> {isEdit ? "Edit" : "Create"} </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal >
    )






}
