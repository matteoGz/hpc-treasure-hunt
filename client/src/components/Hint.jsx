import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { IoTrash } from 'react-icons/io5';
import { RiTreasureMapLine } from "react-icons/ri";
import { deleteHint } from '../services/hintServices';
import { BsCopy } from "react-icons/bs";

const Hint = ({ hint, usersList, userLogged }) => {
    
    const copyHintLink = async () => {
        if(!navigator.clipboard) {
            console.error('Clipboard API not supported');
            alert('Clipboard API not supported');
            return;
        }
        try {
            console.log(window.location.href.split("/"))
            const link = window.location.href.split("/").length === 6 ? (window.location.href) : (window.location.href+"/"+hint.number); 
            await navigator.clipboard.writeText(link);
        } catch (err) {
            console.error('Failed to copy hint link:', err);
            alert('Error copying hint link. Please try again.');
        }
    }

    const eliminationHint = async () => {
        await deleteHint(hint._id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
                const errorMsg = err.response?.data?.message ? err.response.data.message : 'Generic error';
                alert('Delete hint failed: '+ errorMsg);
            })
    }

    return (
        <Card sx={{ minWidth: 275 }} elevation={5}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center"> 
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        <RiTreasureMapLine color='#CDA434' style={{marginRight:5}}/>Hint number. {hint.number}
                    </Typography>
                </Box>
                <Typography color="text.primary">
                    {hint.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={copyHintLink} disabled={usersList.filter(user => user.username === userLogged)[0]?.role !== 'admin'}>
                        <BsCopy color='#3f51b5'/>
                    </IconButton>
                    <IconButton onClick={eliminationHint} disabled={usersList.filter(user => user.username === userLogged)[0]?.role !== 'admin'}>
                        <IoTrash color='#c3170C' />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

Hint.propTypes = {
    hint: PropTypes.object.isRequired,
    usersList: PropTypes.array.isRequired,
    userLogged: PropTypes.string.isRequired
};

export default Hint;