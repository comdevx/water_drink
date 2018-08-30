import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import config from './config'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  state = {
    money: 99,
    list: [],
    coins: [],
    amount: 0,
    status: '',
    changed: []
  }

  componentWillMount() {
    this.getMain()
  }

  getMain = () => {
    const url = config.api + '/main'
    axios.get(url)
      .then(res => {
        const obj = res.data.result
        this.setState({ list: obj.products, coins: obj.coins })
      })
  }

  setMoney = (value) => {
    const { money, amount, changed } = this.state
    const decrease = money - value
    if (decrease <= 0) {
      alert('จำนวนเงินของคุณไม่พอ')
    } else {
      const increase = amount + value
      this.setState({ money: decrease, amount: increase, changed: [...changed, value] })
    }
  }

  selectWater = (obj) => {
    const { amount, money, changed } = this.state
    if (obj.stock) {
      if (obj.price <= amount) {
        const sum = this.check(obj.price, changed)
        this.setState({ amount: 0, status: 'true' })
        const balance = amount - obj.price
        if (balance > 0) {
          let cashBack = this.cashBack(obj.price, sum.total)
          let coin = ''
          if (sum.balance) {
            if (cashBack) {
              const merge = Object.assign(cashBack, sum.balance)
              coin = this.toText(merge)
            } else {
              coin = this.toText(sum.balance)
            }
          } else {
            coin = this.toText(coin)
          }
          alert('คืนเงินจำนวน ' + balance + '\n' + coin)
          this.setState({ money: money + balance })
        }
      } else {
        alert('จำนวนเงินไม่พอ')
        this.setState({ status: 'false' })
      }
    } else {
      alert('สินค้าหมด')
      this.setState({ status: 'false' })
    }
  }

  check = (price, arr) => {
    let coins = _.countBy(arr)
    let total = 0
    arr.map(() => {
      _.reverse(_.keys(coins)).map(key => {
        if (total < price && key <= price && coins[key] > 0) {
          total = total + Number(key)
          coins[key] = coins[key] - 1
        }
      })
    })
    this.setState({ changed: [] })
    let balance = {}
    Object.keys(coins).map(key => {
      if (coins[key] > 0) {
        return balance[key] = coins[key]
      }
    })
    return { total, balance }
  }

  cashBack = (total, price) => {
    let balance = price - total
    const { coins } = this.state
    const sort = _.sortBy(coins, [(o) => { return o.name }])
    let sum = {}
    _.reverse(sort).map(coin => {
      if (balance >= coin.name) {
        sum[coin.name] = sum[coin.name] ? sum[coin.name]++ : 1
        balance = balance - coin.name
      }
    })
    return sum
  }

  toText = (obj) => {
    let text = ''
    Object.keys(obj).map(key => {
      if (obj[key] > 0) {
        text += 'เหรียญ ' + key + ' จำนวน ' + obj[key] + ' เหรียญ \n'
      }
    })
    return text
  }

  cancel = () => {
    const { amount, money } = this.state
    this.setState({ money: money + amount, amount: 0, state: 'false' })
  }

  render() {

    const { money, coins, list, amount, status } = this.state

    const packet = (<label>จำนวนเงินที่มี {money} | จำนวนที่หยอด {amount}</label>)

    const coinsList = (
      <div>
        <label>หยอดเหรียญ ตามราคาน้ำที่ต้องการ</label>
        <br />
        {coins.map(coin => (
          <p>
            <button key={coin._id} className="btn btn-primary" onClick={this.setMoney.bind(this, coin.name)}>{coin.name}</button>
          </p>
        ))}
      </div>
    )

    const watersList = (
      <div>
        <label>กดเลือกน้ำดื่ม</label>
        <br />
        {list.map(water => {
          const color = water.stock ? 'btn btn-success' : 'btn btn-danger'
          return (
            <div className="row">
              <div className="col-sm">
                <img src={water.image} alt={water.name} height={100} />
              </div>
              <div className="col-sm">
                <label>{water.price}</label>
              </div>
              <div className="col-sm">
                <button className={color} onClick={this.selectWater.bind(this, water)}>{water.name}</button>
              </div>
            </div>
          )
        }
        )}
      </div>
    )

    const cancelTag = (
      <div>
        ยกเลิก
          <br />
        {amount ? (<button className="btn btn-danger" onClick={this.cancel.bind(this)}>ยกเลิก</button>)
          : (<button className="btn btn-secondary" onClick={this.cancel.bind(this)} disabled>ยกเลิก</button>)}
      </div>
    )

    const statusTag = (
      <div>
        สถานะ
          <br />
        <label>{status}</label>
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ตู้กดน้ำกระป๋อง</h1>
        </header>
        <p className="App-intro">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                {packet}
                {coinsList}
              </div>
              <div className="col-sm">
                {watersList}
              </div>
              <div className="col-sm">
                {cancelTag}
                {statusTag}
              </div>
            </div>
          </div>
        </p>
      </div>
    )
  }
}

export default App
