import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useState } from 'react';
import './App.css';
import Chip from '@material-ui/core/Chip';
import blue from '@material-ui/core/colors/blueGrey'
import { IEXCloudClient } from 'node-iex-cloud';
import axios from 'axios';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Backdrop from '@material-ui/core/Backdrop';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import format from 'format-number';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { NumberFormat } from 'intl';

const HomePage = () => {
  const defaultTickers = ['HFRO', 'NNN', 'AAPL', 'MS', 'MAC', 'AVB'];
  const toastPositioning = { vertical: 'bottom', horizontal: 'left' };
  const iex = new IEXCloudClient(axios, {
    version: 'stable',
    publishable: 'pk_6260c74f116e4a78af6d9913806d951d',
  });

  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [tickerInput, setTickerInput] = useState('');
  const [tickers, setTickers] = useState(defaultTickers);
  const [amountOfShares, setAmountOfShares] = useState(150);
  const formatNumber = format({ prefix: '$', truncate: 2, padRight: 2 });

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setTickerInput('');
        const res = await iex.batchSymbols(tickers).dividends()
        if (typeof res === 'string') {
          throw new Error(res);
        }
        
        // const randomMonth = ;
        // zygote[`0${randomMonth}`] = forEach.amount * amountOfShares;
        // zygote[`0${randomMonth}`] = forEach.amount * amountOfShares;

        const data = {};
        for (const key in res) {
          if (res[key].dividends.length) {
            data[key] = {
              dividends: [
                res[key]['dividends'][0],
                { amount: res[key]['dividends'][0].amount, exDate: `2020-0${parseInt(Math.random() * (10 - 1) + 1)}-01` }
              ]
            }
          } else {
            data[key] = {
              dividends: [ 
                { amount: 0.014, exDate: `2020-01-01` },
                { amount: 0.014, exDate: `2020-04-01` },
                { amount: 0.014, exDate: `2020-07-01` },
                { amount: 0.014, exDate: `2020-10-01` },
              ]
            }
          }
        }
        // console.log(data)
        await setEvents(data);
        setLoading(false);
        enqueueSnackbar('Dividend Data Reloaded', {
          variant: 'success',
          anchorOrigin: toastPositioning,
        });
      } catch (error) {
        setError(String(error));
        setLoading(false);
      }

    })()
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
    const data = [];
    const monthlyTotals = {
      '01': 0,
      '02': 0,
      '03': 0,
      '04': 0,
      '05': 0,
      '06': 0,
      '07': 0,
      '08': 0,
      '09': 0,
      '10': 0,
      '11': 0,
      '12': 0,
    };

    for (const ticker in events) {
      const zygote = { ticker };
    
      events[ticker]['dividends'].map(forEach => {
        monthlyTotals[forEach.exDate.split('-')[1]] += forEach.amount * amountOfShares;
        zygote[forEach.exDate.split('-')[1]] = forEach.amount * amountOfShares;
      });

      data.push(zygote);
    }

    data.unshift({
      ticker: 'Total',
      '01': monthlyTotals['01'],
      '02': monthlyTotals['02'],
      '03': monthlyTotals['03'],
      '04': monthlyTotals['04'],
      '05': monthlyTotals['05'],
      '06': monthlyTotals['06'],
      '07': monthlyTotals['07'],
      '08': monthlyTotals['08'],
      '09': monthlyTotals['09'],
      '10': monthlyTotals['10'],
      '11': monthlyTotals['11'],
      '12': monthlyTotals['12']
    })

    return data.map((row) => {
      let total = 0;
      Object.keys(row).forEach(key => {
        if (Number(row[key])) {
          total += Number(row[key]);
        }
      });

      const rightBorder = { borderRight: 'lightGray 1px solid', width: '7%' };
      return (
        <TableRow key={row.ticker}>
          <TableCell style={{...rightBorder, width: '10%'}} component="th" scope="row">
            {row.ticker}
          </TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['01'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['02'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['03'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['04'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['05'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['06'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['07'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['08'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['09'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['10'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['11'])}</TableCell>
          <TableCell style={rightBorder} align="right">{formatNumber(row['12'])}</TableCell>
          <TableCell style={{...rightBorder, width: '12%'}} align="right">{formatNumber(total)}</TableCell>
        </TableRow>
      )
    });
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
              const eventsLength = events[ticker] && events[ticker]['dividends'] ? events[ticker]['dividends'].length : 0;
              return (
                <Chip style={{ marginRight: 5, background: eventsLength === 0 && 'rgba(255, 0, 0, 0.5)' }} key={ticker} label={`${ticker}: ${eventsLength}`} onDelete={() => onDeleteTicker(ticker)} />
              )
            })}
          </div>
          <div>
            <Paper component="form">
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
