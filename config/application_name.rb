APPLICATION_NAME = ENV["TITRE_DEMARCHE"].empty? ? "demarches-simplifiees.fr" : ENV["TITRE_DEMARCHE"]
APPLICATION_SHORTNAME = ENV.fetch("APPLICATION_SHORTNAME", "d-s.fr")
APPLICATION_BASE_URL = ENV.fetch("APPLICATION_BASE_URL", "https://www.demarches-simplifiees.fr")
