import React from "react" 
React.useLayoutEffect = React.useEffect 
import { Divider, Form, Input, Result, Switch, Typography } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import { calculateMinimalProbForSparpreis } from '../utils/rechner.js'

const { Title, Text } = Typography

function SparpreisLohntSich() {
  return <Result status="success" title="Nimm den Sparpreis, er lohnt sich in diesem Fall."/>
}

function SparpreisLohntSichNicht() {
  return <Result status="error" title="Nimm den Supersparpreis. Der Sparpreis lohnt sich nicht."/>

}

function LohntSichWennProb({ prob }) {
  return <Result status="warning" title={`Der Sparpreis lohnt sich nur wenn die Wahrscheinlichkeit, dass du die Reise nicht antrittst, ${Math.round(prob * 100)}% oder mehr beträgt.`}/>
}

export default function Home() {

  const [smallerTicketpreis, setSmallerTicketpreis] = useState("0") // supersparpreis
  const [higherTicketpreis, setHigherTicketpreis] = useState("0") // sparpreis
  const [nahverkehrTicketpreis, setNahverkehrTicketpreis] = useState("-1")

  const minimalProb = calculateMinimalProbForSparpreis(parseFloat(smallerTicketpreis), parseFloat(higherTicketpreis), parseFloat(nahverkehrTicketpreis != "-1" ? nahverkehrTicketpreis : "0"))

  return (
    <div>
      <Head>
        <title>Supersparpreisrechner</title>
      </Head>
      <div style={{ maxWidth: 1000, margin: "auto", padding: 20}}>
        <Title>Sparpreisrechner ICE/IC</Title>
        <Text>Du möchtest wissen ob du lieber den Supersparpreis oder den Sparpreis nehmen solltest? Gib hier die Preise an und erhalte das Ergebnis.</Text>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          style={{marginTop: 20}}
        >
          <Form.Item label="Supersparpreis" name="smallerTicketpreis" rules={[{ required: true, message: 'Bitte gib den Supersparpreis an.'}]}>
            <Input type="number" value={smallerTicketpreis} onChange={(e) => setSmallerTicketpreis(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Sparpreis" name="higherTicketpreis" rules={[{ required: true, message: 'Bitte gib den Sparpreis an.'}]}>
            <Input type="number" value={higherTicketpreis} onChange={(e) => setHigherTicketpreis(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Ich benötige ein Nahverkehrsticket">
            <Switch checked={nahverkehrTicketpreis !== "-1"} onChange={(e) => {
              e ? setNahverkehrTicketpreis("0") : setNahverkehrTicketpreis("-1")
            } }/>
          </Form.Item>
          { nahverkehrTicketpreis !== "-1" ? <Form.Item label="Preis des Nahverkehrsticket" name="nahverkehrTicketpreis">
            <Input type="number" value={nahverkehrTicketpreis} onChange={e => setNahverkehrTicketpreis(e.target.value)} />
          </Form.Item> : null}
        </Form>
        <Divider />
        { smallerTicketpreis != "0" && higherTicketpreis != "0" ? <div>
          {minimalProb == 0 ? <SparpreisLohntSich/> : minimalProb == 1 ? <SparpreisLohntSichNicht/> : <LohntSichWennProb prob={minimalProb}/>}
        </div> : null}
      </div>
    </div>
  )
}
