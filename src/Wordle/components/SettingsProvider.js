import React, { createContext, useState, useContext } from "react";
import Modal from "react-modal";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        performance: true,
        debug: false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <SettingsContext.Provider value={{ settings, openModal, closeModal }}>
            {children}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Settings Modal"
                style={{
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "black",
                        width: "420px",
                        height: "fit-content",
                        margin: "auto"
                    },
                    overlay: {
                        backgroundColor: "rgba(0,0,0,.5)"
                    }
                }}
            >
                <h2>Settings</h2>
                <div>
                    Performance{" "}
                    <span style={{ fontSize: "smaller" }}>(Recommended)</span>:{" "}
                    <span
                        style={
                            settings.performance
                                ? {
                                      fontWeight: "bold",
                                      textDecoration: "underline",
                                      textDecorationThickness: "1px"
                                  }
                                : {}
                        }
                        onClick={() =>
                            setSettings((prev) => ({
                                ...prev,
                                performance: true
                            }))
                        }
                    >
                        Y
                    </span>{" "}
                    /{" "}
                    <span
                        style={
                            !settings.performance
                                ? {
                                      fontWeight: "bold",
                                      textDecoration: "underline",
                                      textDecorationThickness: "1px"
                                  }
                                : {}
                        }
                        onClick={() =>
                            setSettings((prev) => ({
                                ...prev,
                                performance: false
                            }))
                        }
                    >
                        N
                    </span>
                </div>
                <div>
                    Diagnostics <span style={{ fontSize: "smaller" }}></span>:{" "}
                    <span
                        style={
                            settings.debug
                                ? {
                                      fontWeight: "bold",
                                      textDecoration: "underline",
                                      textDecorationThickness: "1px"
                                  }
                                : {}
                        }
                        onClick={() =>
                            setSettings((prev) => ({
                                ...prev,
                                debug: true
                            }))
                        }
                    >
                        Y
                    </span>{" "}
                    /{" "}
                    <span
                        style={
                            !settings.debug
                                ? {
                                      fontWeight: "bold",
                                      textDecoration: "underline",
                                      textDecorationThickness: "1px"
                                  }
                                : {}
                        }
                        onClick={() =>
                            setSettings((prev) => ({
                                ...prev,
                                debug: false
                            }))
                        }
                    >
                        N
                    </span>
                </div>
                <button
                    onClick={closeModal}
                    style={{
                        border: "none",
                        outline: "none",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        color: "#00ff00",
                        backgroundColor: "transparent",
                        margin: "10px auto"
                    }}
                >
                    Close
                </button>
            </Modal>
        </SettingsContext.Provider>
    );
};
