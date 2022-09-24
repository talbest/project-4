import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { LoginPage } from '../login';
import { SideLoginBar } from './sideLoginBar';


export const LoginContainer = (props: any) => {
    const { setToken, token, SetEnterStore } = props

    return (
        <>
            <Box sx={{ display: "flex", minHeight: "600px" }}>
                <Card sx={{ flex: 3, m: 2, p: 2, }}>
                    <Box >
                        <LoginPage setToken={setToken} token={token} SetEnterStore={SetEnterStore} />
                    </Box>
                </Card>
                <Card sx={{ flex: 1, m: 2, p: 2 }}>
                    <Box>
                        <SideLoginBar token={token} />
                    </Box>
                </Card>
            </Box>
            <Box sx={{ display: "flex", maxHeight: "220px" }}>
                <Card sx={{ flex: 1, m: 2, p: 2 }}>
                    <Box>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque delectus voluptatibus eveniet eius nihil pariatur accusantium explicabo consequuntur totam? Facilis repudiandae corrupti velit, id eligendi rem harum eius vitae necessitatibus?
                    </Box>
                </Card>
            </Box>
        </>
    )
}
