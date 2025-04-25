import './App.css';
import Committee from "./component/committee"
import Title from './component/title';
import { useState, useEffect } from "react";
import {ChainWallet} from './store/chain'
import Maincontext from './component/context'

function App() {

  // const [chooseEpoch, setChooseEpoch] = useState(1);
  // const [chooseData, setChooseData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [epoch, setEpoch] = useState(0);
  // const [jackpot, setJackpot] = useState(0);
  const [starttime, setStarttime] = useState(0);
  const [committeebeginIndex, setCommitteebeginIndex] = useState(0);
  const [isCommittee, setIsCommittee] = useState(false);

  const [currentHashs, setCurrentHashs] = useState([]);
  const [alternateHashs, setAlternateHashs] = useState([]);
  const [attachHash, setAttachHash] = useState([]);
  const [developerHash, setDeveloperHash] = useState([]);
  const [attachHashrandom, setAttachHashrandom] = useState(false);
  const [attachUpdateBlockHash, setAttachUpdateBlockHash] = useState(false);
  const [attachRandom, setAttachRandom] = useState(false);
  const [developerHashrandom, setDeveloperHashrandom] = useState(false);
  const [developerRandom, setDeveloperRandom] = useState(false);
  const [developerUpdateBlockHash, setDeveloperUpdateBlockHash] = useState(false);

  // const [mycommunityName, setMycommunityName] = useState('');
  // const [isCommunity, setIsCommunity] = useState(false);
  // const [mydeposit, setMydeposit] = useState([]);
  // const [pool, setPool] = useState([]);

  // const [rewardinfo, setRewardinfo] = useState([]);

  let obj = {
    address: accounts,
    committee: committee,
    epoch: epoch,
    starttime: starttime,
    // jackpot: jackpot,
    committeebeginIndex: committeebeginIndex,
    isCommittee: isCommittee,
    currentHashs: currentHashs,
    alternateHashs: alternateHashs,
    attachHash: attachHash,
    developerHash: developerHash,
    // rewardinfo: rewardinfo,

    attachUpdateBlockHash: attachUpdateBlockHash,
    developerUpdateBlockHash: developerUpdateBlockHash,
    attachHashrandom: attachHashrandom,
    attachRandom: attachRandom,
    developerHashrandom: developerHashrandom,
    developerRandom: developerRandom,
    // mycommunityName: mycommunityName,
    // isCommunity: isCommunity,
    // mydeposit: mydeposit,
    // pool: pool,
    developer: '0x0000000000000000000000000000000000000000',
    attach: '0x0000000000000000000000000000000000000000',
    bet_diff: 3600*46,
    commit_diff: 3600,
    base_price: 1*10**17,
    committee_price: 1*10**17,
  }

  async function  getCommitteeInfo() {
    let result = await ChainWallet.committeescontract.get_playball_info(accounts);
      if(result.length > 0 ){
        setCommittee(result[0]);
        setCommitteebeginIndex(result[1].committee_index_start.toString());
        setIsCommittee(result[1]._is_committee);
      }    
    
  }

  async function getSubmitInfo(_epoch) {
    let result = await ChainWallet.attachsubmitcontract.get_submit_info(_epoch);
    if(result.length > 0 ){
       setCurrentHashs(result.current_submit_hash);
      setAlternateHashs(result.alternate_submit_hash);
      setAttachHash(result.attach_submit_hash);
      setDeveloperHash(result.developer_submit_hash);

      setAttachHashrandom(result.attach_submit_hashrandom);
      setAttachRandom(result.attach_submit_random);
      setAttachUpdateBlockHash(result.attach_update_blockhash);
      setDeveloperHashrandom(result.developer_submit_hashrandom);
      setDeveloperRandom(result.developer_submit_random);
      setDeveloperUpdateBlockHash(result.developer_update_blockhash);

    }
  }

  async function get_first_info() {
    let result = await ChainWallet.committeescontract.get_info_for_first_page();
    // console.log(result);
    if(result.length > 0 ){
      setEpoch(result[0].toString()/1);
      setStarttime(result[1].toString()/1);
      // setJackpot(result[2].toString()/1);
      // get_reward_info(result[0].toString()*1 - 1);
      getSubmitInfo(result[0].toString()/1);
    }
    
    
  }

  async function getInfo(){
    try {
      await get_first_info();
      getCommitteeInfo();
      // getPoolInfo();
    }catch(e){
      console.log(e);
    }
  }

  useEffect ( ()=>{
    if(accounts.length > 0){
      setTimeout(() => {
        getInfo();
      }, 1000);
      
    }
  }, [accounts]);

  return (
    <Maincontext.Provider value={obj}>
      <div className="App">
        <Title accounts={accounts} setAccounts={setAccounts}/>
        <Committee getInfo={getInfo}/>
      </div>
    </Maincontext.Provider>
  );
}

export default App;
