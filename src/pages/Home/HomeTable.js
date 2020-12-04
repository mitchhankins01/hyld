import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useState } from 'react';
import './App.css';
import Chip from '@material-ui/core/Chip';
import { IEXCloudClient } from 'node-iex-cloud';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import format from 'format-number';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataGrid } from '@material-ui/data-grid';

const HomePage = () => {
  const defaultTickers = ['HFRO', 'NNN', 'AAPL', 'MS', 'MAC', 'AVB'];
  const toastPositioning = { vertical: 'bottom', horizontal: 'left' };
  const iex = new IEXCloudClient(axios, {
    version: 'stable',
    publishable: 'pk_2d68b4fe291941b99ab69c2f105fa629',
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [tickerInput, setTickerInput] = useState('');
  const [tickers, setTickers] = useState(defaultTickers);
  const [amountOfShares, setAmountOfShares] = useState(1500);

  const formatNumber = format({ prefix: '$', truncate: 2, padRight: 2 });

  React.useEffect(() => {

    const fetchData = async (ticker) => {
      const dividendsArray = await iex.symbol(ticker).dividends('1y');
      if (typeof dividendsArray === 'string') {
        throw new Error(dividendsArray);
      }

      setData(previousData => [...previousData, dividendsArray]);
    };

    try {
      setLoading(true);
      setTickerInput('');

      tickers.forEach(async ticker => {
        fetchData(ticker);
      });

      setLoading(false);
      enqueueSnackbar('Dividend Data Reloaded', {
        variant: 'success',
        anchorOrigin: toastPositioning,
      });
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }


  }, [tickers]);

  React.useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: toastPositioning,
      });
    }
  }, [error]);


  const onClickAdd = () => {
    if (tickers.length >= 8) {
      return enqueueSnackbar('Shucks! This prototype is limited to eight tickers', {
        variant: 'error',
        anchorOrigin: toastPositioning,
      });
    }

    if (tickerInput && !tickers.includes(tickerInput)) {
      setTickers([...tickers, tickerInput]);
      return enqueueSnackbar(`Boom, ${tickerInput} Added`, {
        variant: 'info',
        anchorOrigin: toastPositioning,
      });
    }
  }

  const onClickReset = () => setTickers(defaultTickers)

  const onChangeTickerInput = event => setTickerInput(event.target.value.toUpperCase());
  const onKeyDownTickerInput = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onClickAdd();
    }
  }

  const onDeleteTicker = deleteTicker =>
    setTickers([...tickers.filter(ticker => ticker !== deleteTicker)]);

  const generateTableBody = () => {
    console.log(data);
    const byMonthAndTicker = { '01': {}, '02': {}, '03': {}, '04': {}, '05': {}, '06': {}, '07': {}, '08': {}, '09': {}, '10': {}, '11': {}, '12': {} };

    data.forEach(dividendsArray => {
      dividendsArray.forEach(dividend => {
        const monthIndex = dividend.exDate.split('-')[1];
        byMonthAndTicker[monthIndex][dividend.key] = Number(dividend.amount) * amountOfShares;
        byMonthAndTicker[monthIndex]['Total'] = Number(dividend.amount) * amountOfShares;
      });

    });

    return tickers.map(ticker => {
      let total = 0;
      Object.keys(byMonthAndTicker).forEach(monthIndex => {
        if (Number(byMonthAndTicker[monthIndex][ticker])) {
          total += byMonthAndTicker[monthIndex][ticker]
        }
      })

      const rightBorder = { borderRight: 'lightGray 1px solid', width: '7%' };
      return (
        <TableRow key={ticker}>
          <TableCell style={{ ...rightBorder, width: '10%' }} component="th" scope="row">
            {ticker}
          </TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['01'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['02'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['03'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['04'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['05'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['06'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['07'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['08'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['09'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['10'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['11'][ticker])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(byMonthAndTicker['12'][ticker])}</TableCell>
          <TableCell style={{ ...rightBorder, width: '12%' }} align="right">{formatNumber(total)}</TableCell>
        </TableRow>
      )
    })
  }

  const rightBorder = { borderRight: 'lightGray 1px solid' };
  return (
    <Page pageTitle='HYLD - Dividend Tracker'>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Backdrop open={loading} style={{ zIndex: 99 }}>
          <CircularProgress size={80} style={{ zIndex: 999 }} />
        </Backdrop>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>
          <div>
            {tickers.map(ticker => {
              // const eventsLength = events[ticker] && events[ticker]['dividends'] ? events[ticker]['dividends'].length : 0;
              const eventsLength = 99;
              return (
                <Chip style={{ marginRight: 5, background: eventsLength === 0 && 'rgba(255, 0, 0, 0.5)' }} key={ticker} label={`${ticker}: ${eventsLength}`} onDelete={() => onDeleteTicker(ticker)} />
              )
            })}
          </div>
          <div>
            <Paper component="form">
              <span style={{ margin: 10 }}>{amountOfShares} shares</span>
              <IconButton onClick={onClickReset} disabled={JSON.stringify(tickers) === JSON.stringify(defaultTickers)} >
                <RestoreIcon />
              </IconButton>
              <InputBase onKeyDown={onKeyDownTickerInput} onChange={onChangeTickerInput} value={tickerInput} placeholder='Add Ticker' />
              <IconButton onClick={onClickAdd} >
                <SearchIcon />
              </IconButton>
              <Divider orientation="vertical" />

            </Paper>
          </div>
        </div>

        <Paper style={{ margin: '0 15px' }}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell style={rightBorder}>Ticker</TableCell>
                  <TableCell style={rightBorder} align='right'>JAN</TableCell>
                  <TableCell style={rightBorder} align='right'>FEB</TableCell>
                  <TableCell style={rightBorder} align='right'>MAR</TableCell>
                  <TableCell style={rightBorder} align='right'>APR</TableCell>
                  <TableCell style={rightBorder} align='right'>MAY</TableCell>
                  <TableCell style={rightBorder} align='right'>JUN</TableCell>
                  <TableCell style={rightBorder} align='right'>JUL</TableCell>
                  <TableCell style={rightBorder} align='right'>AUG</TableCell>
                  <TableCell style={rightBorder} align='right'>SEP</TableCell>
                  <TableCell style={rightBorder} align='right'>OCT</TableCell>
                  <TableCell style={rightBorder} align='right'>NOV</TableCell>
                  <TableCell style={rightBorder} align='right'>DEC</TableCell>
                  <TableCell style={rightBorder} align='right'>Annual Income</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateTableBody()}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
      </Scrollbar>
    </Page>
  )
}
export default HomePage
