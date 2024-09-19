import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ActiveExchangesValue } from './app.interface';
import { useExchanges } from './hooks/useExchanges';
import { FaArrowsAltV } from "react-icons/fa";

function App() {
  
  const [activeExchangesValues, setActiveExchangesValues] = useState<ActiveExchangesValue[] | null>(null);
  const [selectedCurrency1st, setSelectedCurrency1st] = useState<number>(1);
  const [selectedCurrency2nd, setSelectedCurrency2nd] = useState<number>(1);
  const [valueCurrency1st, setValueCurrency1st] = useState<string>('0.00');
  const [valueCurrency2nd, setValueCurrency2nd] = useState<string>('0.00');
  const [coefficient, setCoefficient] = useState<number>(1);
  const [lastChanged, setLastChanged] = useState< 1 | 2 | null>(null);
  const [modifiedData, setModifiedData] = useState<ActiveExchangesValue[] | null>(null);

  const { isLoading, error, data } = useExchanges();

  useEffect(() => {
    if (data) {
      const activeExchangesList = ['USD', 'EUR'];
  
      const newCurrency: ActiveExchangesValue = {
        CurrencyCodeL: 'UAH',
        Units: 1,
        Amount: 1,
      };
  
      setModifiedData([...data, newCurrency]);

      const filteredData: ActiveExchangesValue[] = data
        .filter(item => activeExchangesList.includes(item.CurrencyCodeL));
  
      setActiveExchangesValues(filteredData);
    }
  }, [data]);

  useEffect(() => {
    const newCoefficient = selectedCurrency1st / selectedCurrency2nd;
    setCoefficient(newCoefficient);
  }, [selectedCurrency1st, selectedCurrency2nd]);

  useEffect(() => {
    const value1 = parseFloat(valueCurrency1st);
    const value2 = parseFloat(valueCurrency2nd);
  
    if (lastChanged === 1 || lastChanged === null) {
      const newValue = (value1 * coefficient).toFixed(2);
      setValueCurrency2nd(newValue);
    } else if (lastChanged === 2) {
      const newValue = (value2 / coefficient).toFixed(2);
      setValueCurrency1st(newValue);
    }
  }, [valueCurrency1st, valueCurrency2nd, coefficient, lastChanged]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Калькулярот розрахунку валют</h1>
        <h3 className={styles.pageSubTitle}>Актуальний курс валют до гривні</h3>
        {activeExchangesValues ? (
          <ul className={styles.activeExchangesList}>
            {activeExchangesValues.map((item)=>{
              return (
                <li className={styles.ActiveExchangesValue} key={item.CurrencyCodeL}>{item.CurrencyCodeL} : {(item.Amount/item.Units).toFixed(2)} ₴</li>
              )
            })}
          </ul>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>{error?.message}</div>
        )}
      </header>
      <main className={styles.main}>
        {modifiedData && <>
          <div className={styles.currencyWrapper}>
            <input
              className={styles.currencyInput}
              type="number"
              value={valueCurrency1st}
              onChange={(e) => {
                setValueCurrency1st(e.target.value);
                setLastChanged(1);
              }}
              onBlur={() => {
                const formattedValue = parseFloat(valueCurrency1st).toFixed(2);
                setValueCurrency1st(formattedValue);
              }}
            />
            
            <select
              value={selectedCurrency1st}
              onChange={(e) => {
                setSelectedCurrency1st(parseFloat(e.target.value));
                setLastChanged(null);
              }}
              className={styles.currencySelect}
            >
              <option value="" disabled>
                Валюта
              </option>
              {modifiedData.map((item) => (
                <option key={item.CurrencyCodeL} value={(item.Amount / item.Units)}>
                  {item.CurrencyCodeL}
                </option>
              ))}
            </select>
          </div>
          <FaArrowsAltV className={styles.icon}/>
          <div className={styles.currencyWrapper}>
            <input
              className={styles.currencyInput}
              type="number"
              value={valueCurrency2nd}
              onChange={(e) => {
                setValueCurrency2nd(e.target.value);
                setLastChanged(2);
              }}
              onBlur={() => {
                const formattedValue = parseFloat(valueCurrency2nd).toFixed(2);
                setValueCurrency2nd(formattedValue);
              }}
            />
            <select
              value={selectedCurrency2nd}
              onChange={(e) => {
                setSelectedCurrency2nd(parseFloat(e.target.value));
                setLastChanged(null);
              }}
              className={styles.currencySelect}
            >
              <option value="" disabled>
                Валюта
              </option>
              {modifiedData.map((item) => (
                <option key={item.CurrencyCodeL} value={(item.Amount / item.Units)}>
                  {item.CurrencyCodeL}
                </option>
              ))}
            </select>
          </div>
        </>}
      </main>
    </div>
  );
}

export default App;
