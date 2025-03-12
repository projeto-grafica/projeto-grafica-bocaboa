import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
`

export const SearchContainer = styled.div`
  position: relative;
  max-width: 40vw;
  margin: 0 auto 3rem auto;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 3rem;
  border-radius: 50px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

export const SectionContainer = styled.div`
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
`

export const AccordionContainer = styled.div`
  margin-bottom: 1rem;
`

export const AccordionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
`

export const AccordionHeader = styled.div`
  padding: 1rem;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  
  &:hover {
    background-color: #f0f0f0;
  }
`

export const AccordionIcon = styled.span`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`

export const AccordionContent = styled.div`
  padding: ${(props) => (props.isOpen ? "1rem" : "0 1rem")};
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`

export const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
`

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`
