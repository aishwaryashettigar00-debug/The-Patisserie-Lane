import streamlit as st
import google.generativeai as genai

st.set_page_config(page_title="Gemini App", page_icon="🤖")

st.title("Gemini AI App")

genai.configure(api_key=st.secrets["API_KEY"])

model = genai.GenerativeModel("gemini-1.5-flash")

prompt = st.text_input("Enter your prompt")

if st.button("Generate"):
    if prompt:
        response = model.generate_content(prompt)
        st.write(response.text)
    else:
        st.warning("Please enter a prompt")

