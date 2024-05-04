import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper } from '@mui/material';


const GetMonthPopularity = () => {
    const [results, setResults] = useState([]);
    const [artist, setArtist] = useState('');

    const search = async () => {
        const res = await axios.get(`http://localhost:8081/month_popularity?artist=${artist}`);
        setResults(res.data);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h2">
                    Get the Number of Concerts per Month for an Artist
                </Typography>

                <Box my={2}>
                    <TextField
                        label="Set Artist Name"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        fullWidth
                    />
                </Box>

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={search} fullWidth>
                        Search
                    </Button>
                </Box>

                <Typography variant="h5" component="h3">
                    Search Results:
                </Typography>

                <TableContainer component={Paper} sx={{ height: 400, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Artist</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Number of Concerts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.length > 0 ? (
                                results.map((result, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{result.artist}</TableCell>
                                        <TableCell>{result.month}</TableCell>
                                        <TableCell>{result.concert_count}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Typography>Waiting for query result...</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </Box>
        </Container>
        
    );

}

export default GetMonthPopularity;