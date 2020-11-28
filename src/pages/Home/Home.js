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
import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const iex = new IEXCloudClient(axios, {
  publishable: "pk_6260c74f116e4a78af6d9913806d951d",
  version: "stable"
});


const HomePage = () => {
  const defaultTickers = ['HFRO', 'NNN', 'AAPL'];
  const toastPositioning = { vertical: 'top', horizontal: 'right' };

  const [error, setError] = useState(null);
  const [events, setEvents] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [tickers, setTickers] = useState(defaultTickers);
  const [state, setState] = useState(moment('2020-11-15'));

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await iex.batchSymbols(tickers).dividends('1m');

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

    const answer = window.prompt('Ticker:');
    if (answer && !tickers.includes(answer)) {
      setTickers([...tickers, answer.toUpperCase()]);
      return enqueueSnackbar('Got it, ticker added', {
        variant: 'info',
        anchorOrigin: toastPositioning,
      });
    }
  }

  const onClickReset = () => setTickers(defaultTickers)

  const onDeleteTicker = deleteTicker =>
    setTickers([...tickers.filter(ticker => ticker !== deleteTicker)]);

  const renderDay = day => {
    return Object.keys(events).map(key => {
      if (events[key]['dividends'] && events[key]['dividends'][0] && day.toISOString().slice(0, 10) === events[key]['dividends'][0].exDate) {
        const sorted = Object.keys(events[key]['dividends'][0]).map(property => {
          return { property, value: events[key]['dividends'][0][property] };
        }).sort((a, b) => (a.value.length > b.value.length) ? 1 : -1)

        return (
          <Tooltip
            title={
              <div style={{ padding: 5, fontSize: '1rem' }}>
                {sorted.map(({ property, value }) => (
                  <div key={property} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{property}</span>
                    <span style={{ width: 20 }} />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            }
          >
            <Chip color='primary' style={{ display: 'flex', justifyContent: 'flex-start' }} key={events[key]['dividends'][0].exDate} label={key} icon={<AttachMoneyIcon fontSize='small' />} />
          </Tooltip>
        );
      } else {
        return null;
      }
    });
  }

  return (
    <Page pageTitle='Dividend Tracker'>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {loading && (
          <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', zIndex: 99, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0, 0, 0, 0.3)' }}>
            <CircularProgress size={80} />
          </div>
        )}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
          <div>
            {tickers.map(ticker => {
              const eventsLength = events[ticker] && events[ticker]['dividends'] ? events[ticker]['dividends'].length : 0;
              return (
                <Chip style={{ marginRight: 5, padding: 5, background: eventsLength === 0 && 'rgba(255, 0, 0, 0.5)' }} key={ticker} label={`${ticker}: ${eventsLength}`} onDelete={() => onDeleteTicker(ticker)} />
              )
            })}
          </div>
          <div>
            <Button disabled={JSON.stringify(tickers) === JSON.stringify(defaultTickers)} style={{ marginRight: 10 }} variant='outlined' color='secondary' onClick={onClickReset}>Reset Tickers</Button>
            <Button variant='contained' color='primary' onClick={onClickAdd}>Add Ticker</Button>
          </div>
        </div>
      </Scrollbar>
    </Page>
  )
}
export default HomePage