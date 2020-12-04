import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
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
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
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

const HomePage = () => {
  const defaultTickers = ['HFRO', 'NNN', 'AAPL'];
  const toastPositioning = { vertical: 'bottom', horizontal: 'left' };
  const iex = new IEXCloudClient(axios, {
    version: 'stable',
    publishable: 'pk_2d68b4fe291941b99ab69c2f105fa629',
  });

  const [error, setError] = useState(null);
  const [events, setEvents] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [tickerInput, setTickerInput] = useState('');
  const [tickers, setTickers] = useState(defaultTickers);
  const [state, setState] = useState(moment('2020-11-15'));
  const formatNumber = format({ prefix: '$', truncate: 2, padRight: 2 });

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setTickerInput('');
        const res = await iex.batchSymbols(tickers).dividends()
        console.log(res);
        if (typeof res === 'string') {
          throw new Error(res);
        }
        await setEvents(res);
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
    if (tickers.length >= 4) {
      return enqueueSnackbar('Shucks! This prototype is limited to four tickers', {
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

  const renderDay = day => {
    return Object.keys(events).map(key => {
      if (events[key]['dividends'] && events[key]['dividends'][0] && day.toISOString().slice(0, 10) === events[key]['dividends'][0].exDate) {
        const sorted = Object.keys(events[key]['dividends'][0]).map(property => {
          return { property, value: events[key]['dividends'][0][property] };
        }).sort((a, b) => (a.value.length > b.value.length) ? 1 : -1);

        return (
          <Tooltip
            title={
              <div style={{ padding: 2, fontSize: '1rem' }}>
                {[
                  {
                    property: 'Total Income',
                    value: formatNumber(Number(events[key]['dividends'][0].amount * 3324))
                  },
                  ...sorted
                ].map(({ property, value }, index) => (
                  <div key={property} style={{ display: 'flex', justifyContent: 'space-between', margin: index === 0 ? '20px 7px 20px 7px' : 7, fontWeight: index === 0 && 800 }}>
                    <span>{property.split(/(?=[A-Z])/).map(a => a.charAt(0).toUpperCase() + a.substr(1) + ' ')}</span>
                    <span style={{ width: 20 }} />
                    <span>{value}</span>
                  </div>
                ))}
                <span style={{ display: 'flex', justifyContent: 'flex-end', margin: 7, marginTop: 15, fontSize: '0.8rem' }}>Source: IEX</span>
              </div>
            }
          >
            <Chip size='small' color='primary' style={{ display: 'flex', justifyContent: 'center' }} key={events[key]['dividends'][0].exDate} label={key} icon={<AttachMoneyIcon fontSize='small' />} />
          </Tooltip>
        );
      } else {
        return null;
      }
    });
  }

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
            {/* <Button variant='contained' color='primary' onClick={onClickAdd}>Add Ticker</Button> */}
          </div>
        </div>
        <Paper style={{ margin: '0 15px' }}>
          <Calendar
            date={state}
            onChangeMonth={date => setState(date)}
            onPickDate={date => console.log(date)}
            renderDay={({ day, classNames, onPickDate }) => (
              <div
                key={day.format()}
                onClick={e => onPickDate(day)}
                className={`Calendar-grid-item ${day.isSame(moment(), 'day') && 'Calendar-grid-item--current'} ${classNames}`}
              >
                {day.format('D')}
                {renderDay(day)}
              </div>
            )}
            renderHeader={({ date, onPrevMonth, onNextMonth }) => (
              <div className="Calendar-header" style={{ background: blue[300] }}>
                <Button style={{ color: 'white' }} color='secondary' onClick={onPrevMonth} startIcon={<ArrowBackIcon />}>
                  Previous
              </Button>
                <div className="Calendar-header-currentDate">
                  {date.format('MMMM YYYY')}
                </div>
                <Button style={{ color: 'white' }} color='secondary' onClick={onNextMonth} endIcon={<ArrowForwardIcon />}>
                  Next
              </Button>
              </div>
            )}
          />
        </Paper>


        
      </Scrollbar>
    </Page>
  )
}
export default HomePage
