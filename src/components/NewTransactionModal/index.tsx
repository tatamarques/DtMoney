import { FormEvent, useState} from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';


import {Container, 
        TransactionTypeContainer, 
        RadioButton} from './styles';

interface NewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps) {
  const {createTransaction} = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(e: FormEvent){
    e.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return(
    <Modal isOpen={isOpen}
           onRequestClose={onRequestClose}
           overlayClassName="react-modal-overlay"
           className="react-modal-content"
           >
          <button type="button" 
                  onClick={onRequestClose}
                  className="react-modal-close">
            <img src={closeImg} alt="closeImg"/>
          </button>
          <Container onSubmit={handleCreateNewTransaction}>
            <h2>New transaction</h2>

            <input
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}/>

            <input
              type="number"
              placeholder='Amount'
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}/>  

            <TransactionTypeContainer>
              <RadioButton type='button'
                           onClick={()=> {setType('deposit')}}
                           isActive={type === 'deposit'}
                           activeColor="green">
                <img src={incomeImg} alt="income"/>
                <span>Income</span>
              </RadioButton>
              <RadioButton type='button'
                           onClick={()=> {setType('withdraw')}}
                           isActive={type === 'withdraw'}
                           activeColor="red">
                <img src={outcomeImg} alt="outcome"/>
                <span>Outcome</span>
              </RadioButton>
            </TransactionTypeContainer> 

            <input
              placeholder='Category'
              value={category}
              onChange={e => setCategory(e.target.value)}/>  

            <button type='submit'>
              Confirm
            </button>
            
          </Container>     
    </Modal>
  )

}