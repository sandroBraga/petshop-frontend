import styled from "styled-components";

export const Input = styled.input`
  flex: 1;
  min-height: 30px;
  margin-bottom: 15px;
  padding: 0 20px;
  color: #777;
  font-size: 15px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  &::placeholder {
    color: #999;
  }
`

export const Label = styled.label`
  display:block;
  font-size: 14px;
`

export const Form = styled.div`
`
export const Button = styled.button`
  color: #ffff;
  font-size: 16px;
  background: #fc6963;
  height: 30px;
  border: 0;
  border-radius: 5px;
  width: 100px;
`
